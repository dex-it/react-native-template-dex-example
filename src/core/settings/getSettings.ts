import {IAppSettings} from "./appSettings";

const getSettings = (): IAppSettings => {
    // @ts-ignore
    if (require.resolve) {
        // @ts-ignore
        delete require.cache[require.resolve("../../../../resources/settings/mobileSettings.json")];
    }
    let mobileSettings: IAppSettings = require("../../../../resources/settings/mobileSettings.json");

    let environmentSettings: IAppSettings;
    switch (mobileSettings.environment) {
        case "Development":
            environmentSettings = require("../../../../resources/settings/mobileSettings.Development.json");
            break;
        case "Test":
            environmentSettings = require("../../../../resources/settings/mobileSettings.Test.json");
            break;
        case "Staging":
            environmentSettings = require("../../../../resources/settings/mobileSettings.Staging.json");
            break;
        case "Production":
            environmentSettings = require("../../../../resources/settings/mobileSettings.Production.json");
            break;
        default:
            throw new Error(`Not found settings for environment '${mobileSettings.environment}'`);

    }
    mobileSettings = Object.assign(mobileSettings, environmentSettings);

    if (typeof __DEV__ != "undefined" && __DEV__) {
        const localSettings = require("../../../../resources/settings/localSettings.json");
        mobileSettings = Object.assign(mobileSettings, localSettings);
    }

    return mobileSettings;
};

declare const module: any; // we need this for use this file in tools/uploadBugsnag.js
module.exports.getSettings = getSettings;
