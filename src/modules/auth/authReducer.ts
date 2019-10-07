import {Failure} from "typescript-fsa";
import {reducerWithInitialState} from "typescript-fsa-reducers";
import {newState} from "../../common/newState";
import {CoreActions} from "../../core/store";
import {AuthActions, IAuthParams} from "./authActions";
import {AuthInitialState, IAuthState} from "./authState";

function rehydrate(): IAuthState {
    return {...AuthInitialState};
}

function loginByEmailStarted(state: IAuthState): IAuthState {
    return newState(state, {error: null, errorSource: null, isAuthenticating: true});
}

function loginByEmailDone(state: IAuthState): IAuthState {
    return newState(state, {error: null, errorSource: null, isAuthenticating: false});
}

function loginByEmailFailed(state: IAuthState, failed: Failure<IAuthParams, Error>): IAuthState {
    return newState(state, {
        error: failed.error.message,
        isAuthenticating: false,
        errorSource: failed.params.errorSource
    });
}

export const authReducer = reducerWithInitialState(AuthInitialState)
    .case(CoreActions.rehydrate, rehydrate)
    .case(AuthActions.login.started, loginByEmailStarted)
    .case(AuthActions.login.done, loginByEmailDone)
    .case(AuthActions.login.failed, loginByEmailFailed)
;