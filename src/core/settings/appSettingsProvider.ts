import {IAppSettings} from "./appSettings";
// tslint:disable:no-var-requires
const getSettings = require("./getSettings").getSettings;

class AppSettingsProvider {
    private _settings: IAppSettings;

    get settings(): IAppSettings {
        if (!this._settings) {
            this._settings = getSettings();
        }

        return this._settings;
    }
}

export const appSettingsProvider = new AppSettingsProvider();
