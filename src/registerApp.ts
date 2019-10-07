import {AppRegistry} from "react-native";
import {appSettingsProvider} from "./core/settings";
import {Playground} from "./common/playground";
import {App} from "./App";

// noinspection JSUnusedGlobalSymbols | used from js code
export function registerApp(): void {
    const rootComponent = appSettingsProvider.settings.devOptions.showAllComponentsOnStart ? Playground : App;
    AppRegistry.registerComponent(appSettingsProvider.settings.appName, () => rootComponent);
}
