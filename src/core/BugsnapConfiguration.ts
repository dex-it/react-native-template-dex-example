import {Client, Configuration} from "bugsnag-react-native";
import {Dictionary} from "lodash";
import {Dispatch, Store, applyMiddleware, Middleware} from "redux";
import {ReduxStack} from "redux-stack";
import {decodeToken} from "../common/utils";
import {ExceptionType, isErrorOfType} from "./exceptionTypes";
import {appSettingsProvider} from "./settings";
import {IAppState} from "./store/appState";

export class BugsnapConfiguration {
    private static _client: Client;

    static configure(store: Store<IAppState>): void {
        const configuration = new Configuration();
        configuration.appVersion = appSettingsProvider.settings.version;
        configuration.apiKey = appSettingsProvider.settings.bugReportApiKey;
        configuration.releaseStage = appSettingsProvider.settings.environment;

        if (configuration.beforeSendCallbacks) {
            configuration.beforeSendCallbacks.push((report) => {
                report.metadata = {
                    ...report.metadata,
                    state: store.getState()
                };
                console.warn(new Error("Unhandled Error"), "Unhandled Error", report);

                return true;
            });
        }

        BugsnapConfiguration._client = new Client(configuration);
        BugsnapConfiguration.setUser(store.getState().system.authToken);
    }

    static runIfConfigured(action: (client: Client) => void): void {
        if (BugsnapConfiguration._client) {
            action(BugsnapConfiguration._client);
        }
    }

    static notifyIfNeedIt(error: Error, description?: string, metadata?: object): void {
        if (!isErrorOfType(error, ExceptionType.Connection) && !isErrorOfType(error, ExceptionType.NoAuth)) {
            BugsnapConfiguration.runIfConfigured(client => {
                if (description) {
                    client.leaveBreadcrumb(description, metadata);
                }
                client.notify(error);
            });
        }
        console.warn("Notify : ", {description, metadata});
    }

    static handlePromise<T>(promise: Promise<T>, description?: string, metadata?: object): void {
        promise.catch(reason => {
            BugsnapConfiguration.notifyIfNeedIt(reason, description, metadata);
        });
    }

    static setUser(userToken: string | null): void {
        if (userToken != null) {
            BugsnapConfiguration.runIfConfigured((client) => {
                const tokenInfo = decodeToken(userToken);
                client.setUser(tokenInfo.userId, tokenInfo.name, tokenInfo.email);
            });
        }
    }
}

const logger: Middleware = function (): (next: Dispatch) => Dispatch {
    return (next: Dispatch): Dispatch => {
        return (action: any): any => {
            const metadata: Dictionary<any> = {actionName: action.type};
            if (action.routeName) {
                metadata.routeName = action.routeName;
            }
            BugsnapConfiguration.runIfConfigured(client => client.leaveBreadcrumb("redux", metadata));

            return next(action);
        };
    };
};

export const bugsnagLog: ReduxStack = {
    enhancers: [applyMiddleware(logger)]
};
