export class UrlHelper {
    static create(relativeUrl: string, baseUrl: string): string {
        if (baseUrl.endsWith("/") && relativeUrl.startsWith("/")) {
            return baseUrl + relativeUrl.substring(1);
        } else if (baseUrl.endsWith("/")) {
            return baseUrl + relativeUrl;
        } else if (relativeUrl.startsWith("/")) {
            return baseUrl + relativeUrl;
        } else {
            return baseUrl + "/" + relativeUrl;
        }
    }
}
