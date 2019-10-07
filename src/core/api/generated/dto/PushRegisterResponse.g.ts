/*tslint:disable*/

export interface PushRegisterResponse {
    id: string;
    device_id: string;
    platform: "android" | "ios";
    firebase_token: string;
    token_expired_at: string;
    created_at: string;
}