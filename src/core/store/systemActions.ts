import {actionCreator} from "./actionCreator";

export class SystemActions {
    static setToken = actionCreator<string>("System/SET_TOKEN");
    static setNotificationInfo = actionCreator<INotificationInfo | null>("System/SET_NOTIFICATION_INFO");
}

export interface INotificationInfo {
    token: string;
    registrationId: string;
    token_expired_at: string;
}