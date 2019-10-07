import {Run} from "../core/api/generated/dto/Run.g";
import {appSettingsProvider} from "../core/settings";

export const testCase = appSettingsProvider.settings.devOptions.useTestCase
    ? {
        id: "1",
        order: {
            id: 1,
            sender_address: "some address",
            recipient_address: "some address",
            cargo: "some cargo",
        },
    } as Run
    : null;