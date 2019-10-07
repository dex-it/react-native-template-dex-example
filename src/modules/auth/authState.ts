export interface IAuthState {
    isAuthenticating: boolean;
    error: string | null;
    errorSource: ErrorSource | null;
}

export const AuthInitialState: IAuthState = {
    isAuthenticating: false,
    error: null,
    errorSource: null
};

export type ErrorSource = "email" | "password" | "both";