/*tslint:disable*/

export interface PushRegisterRequest {
    device_id: string;
    platform: "android" | "ios";
    firebase_token: string;
}