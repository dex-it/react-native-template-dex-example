import {Alert, Linking, Platform} from "react-native";
import {appSettingsProvider} from "../../core/settings";
import {hockeyUpdateChecker} from "./hockeyUpdateChecker";
import {ignorePromise} from "./ignorePromise";

export class HockeyUpdateHelper {
    static check(): void {
        const appSettings = appSettingsProvider.settings;
        if (appSettings.environment == "Development" || appSettings.environment == "Production") {
            return;
        }

        const updateDesc = "Open Update Url";

        hockeyUpdateChecker.checkUpdateAvailable(Platform.OS, appSettings)
            .then(version => {
                if (version != null) {
                    Alert.alert(
                        "Update available",
                        `New version available ${version.version}`,
                        [
                            {
                                text: "Cancel",
                            },
                            {
                                text: "Update",
                                onPress: (): void => ignorePromise(Linking.openURL(version.link), updateDesc)
                            },
                        ],
                        {cancelable: false}
                    );
                }
            });
    }
}