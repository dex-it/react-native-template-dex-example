import _ from "lodash";
import {PlatformOSType} from "react-native";
import {IAppSettings} from "../../core/settings/appSettings";

class HockeyUpdateChecker {
    async checkUpdateAvailable(platform: PlatformOSType, settings: IAppSettings): Promise<IUpdateInfo | null> {
        try {
            const hockeyOptions = platform == "ios"
                ? settings.devOptions.iOSHockeyOptions
                : settings.devOptions.androidHockeyOptions;
            const input = `https://rink.hockeyapp.net/api/2/apps/${hockeyOptions.appId}/app_versions`;

            const versions: { app_versions: any[] } = await fetch(input, {
                headers: {"X-HockeyAppToken": hockeyOptions.apiToken}
            }).then((r: any) => r.json());

            const maxVersion: IHockeyVersion = _.maxBy(versions.app_versions, v => parseInt(v.version));

            if (parseInt(maxVersion.version) > settings.build) {
                return {
                    link: maxVersion.download_url,
                    version: `${maxVersion.shortversion}(${maxVersion.version})`
                };
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    }
}

interface IUpdateInfo {
    version: string;
    link: string;
}

interface IHockeyVersion {
    version: string;
    shortversion: string;
    download_url: string;
}

export const hockeyUpdateChecker = new HockeyUpdateChecker();