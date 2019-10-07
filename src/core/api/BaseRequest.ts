import {assertNotNull} from "../../common/assertNotNull";
import {UrlHelper} from "../../common/helpers";
import {localization} from "../../common/localization/localization";
import {ExceptionType, NoAuthError} from "../exceptionTypes";
import {appSettingsProvider} from "../settings";

export interface IRequestOptions {
    getToken: () => string | null;
    setToken: (token: string) => void;
    onAuthError: () => void;
}

export class BaseRequest {
    static handleError = (error: any): Promise<any> => {
        return Promise.reject(error);
    };
    static globalOptions: IRequestOptions;
    private emptyResponse: EmptyResponse;

    constructor() {
        this.emptyResponse = new EmptyResponse();
    }

    protected get options(): IRequestOptions {
        return (
            BaseRequest.globalOptions || {
                getToken: (): string | null => null,
                onAuthError: (): void => console.warn("onAuthError is not set")
            }
        );
    }

    protected addTokenToHeaders(headers: any): any {
        const userToken = this.options.getToken();

        if (userToken != null) {
            return {...headers, Authorization: `Bearer ${userToken}`};
        } else {
            return headers;
        }
    }

    protected async fetch(url: string, config: any, isFullUrl?: boolean): Promise<any> {
        let isRequestError = false;
        let status: number | null = null;
        const customHeaders = config.headers != undefined ? config.headers : {};

        try {
            const headers = this.addTokenToHeaders({
                Accept: "application/json",
                "Content-Type": "application/json",
                Cookie: "",
                ...customHeaders
            });

            const response = await fetch(
                isFullUrl == true ? url : this.createUrl(url),
                Object.assign(config, {headers: headers})
            );

            status = response.status;
            if (response.status == 401) {
                this.options.onAuthError();

                throw new NoAuthError("No auth for " + url);
            } else if (response.status == 204) {
                return this.emptyResponse;
            } else if (response.status == 404) {
                isRequestError = true;
                throw new Error(url.endsWith("auth/sign_in")
                    ? localization.errors.loginError
                    : localization.errors.notFound
                );
            } else if (!response.status || response.status < 200 || response.status >= 300) {
                isRequestError = true;
                throw await response.json();
            }

            return response;
        } catch (error) {
            if (!isRequestError) {
                console.warn(localization.errors.noInternetConnection, error);
                const connectionError: any = new Error(error.message);
                connectionError.name = ExceptionType.Connection;
                connectionError.innerError = error;
                connectionError.url = url;
                if (error.message == "Network request failed") {
                    connectionError.message = localization.errors.noInternetConnection;
                }
                throw connectionError;
            } else {
                error.isServerError = true;
                console.warn(error, "Request error", {url, status});
                if (error.message == null
                    || error.message.startsWith("JSON")
                    || error.message.startsWith("Unexpected")) {
                    error.message = localization.errors.unknownError;
                }
                throw error;
            }
        }
    }

    protected createUrl(relativeUrl: string): string {
        return UrlHelper.create(relativeUrl, this.getUrl());
    }

    protected q(params: { [key: string]: string | number | boolean | string | Date | null }): string {
        const query = Object.keys(params)
            .filter((k) => params[k] != null)
            .map((k) => `${k}=${encodeURIComponent(assertNotNull(params[k]).toString())}`)
            .join("&");

        return query ? `?${query}` : "";
    }

    //TODO: Temporary fix the issue with Android's https requests
    private getUrl(): string {
        return appSettingsProvider.settings.serverUrl.replace("https", "http");
    }
}

class EmptyResponse {
    public json(): any {
        return null;
    }
}
