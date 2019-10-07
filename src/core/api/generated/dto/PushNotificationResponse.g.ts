/*tslint:disable*/

export interface PushNotificationResponse {
    id: number;
    device_id: string;
    platform: string;
    firebase_token: string;
    token_expired_at: string;
    created_at: string;
}