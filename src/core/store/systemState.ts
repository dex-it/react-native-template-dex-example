import {INotificationInfo} from "./systemActions";

export interface ISystemState {
    buildNumber: number;
    notificationInfo: INotificationInfo | null;
    authToken: string | null;
}

export const SystemInitialState: ISystemState = {
    authToken: null,
    notificationInfo: null,
    buildNumber: 1,
};