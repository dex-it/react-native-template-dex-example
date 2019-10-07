import {Dimensions, ImageURISource} from "react-native";
import {appSettingsProvider} from "../../core/settings";
import {UrlHelper} from "../helpers";

const templateResources = new Map<string, ImageURISource>();

export class ImageSource implements ImageURISource {
    private static cache = new Map<string, ImageSource>();
    uri: string;
    bundle?: string;
    width?: number;
    height?: number;

    constructor(private relativeUri: string) {
        this.uri = UrlHelper.create(this.relativeUri, appSettingsProvider.settings.serverUrl);
    }

    static create(uri: string | null | undefined): ImageURISource | undefined {
        if (!uri) {
            return undefined;
        }

        const source = ImageSource.cache.get(uri);
        if (source != null) {
            return source;
        } else {
            let newSource: ImageSource;

            if (uri.indexOf("http") == 0) {
                newSource = {uri} as ImageSource;
            } else if (uri.indexOf("content") == 0 //android content
                || uri.indexOf("file://") == 0 //file uri
                || uri.indexOf("/private") == 0 //ios file path
            ) {
                newSource = {uri} as ImageSource;
            } else {
                const templateResource = templateResources.get(uri);
                if (templateResource != null) {
                    return templateResource;
                }

                newSource = new ImageSource(uri);
            }
            ImageSource.cache.set(uri, newSource);

            return newSource;
        }
    }

    static getPreview(uri: string | null | undefined, imageWidth: number | null = null): ImageURISource | undefined {
        if (!uri) {
            return undefined;
        } else {
            const {scale, width} = Dimensions.get("window");

            return ImageSource.create(uri + `?width=${imageWidth != null ? imageWidth * scale : width * scale}`);
        }
    }

    toString(): string {
        return this.uri;
    }
}
