import {Dispatch} from "redux";
import {AuthHelper} from "../../common/helpers/authHelper";
import {localization} from "../../common/localization/localization";
import {SimpleThunk} from "../../common/simpleThunk";
import {SignInRequestDto} from "../../core/api/generated/dto/SignInRequest.g";
import {requestsRepository} from "../../core/api/requestsRepository";
import {AuthActions, IAuthParams} from "./authActions";

export class AuthActionsAsync {
    static login(email: string, password: string): SimpleThunk {
        return async (dispatch: Dispatch): Promise<void> => {
            const params: IAuthParams = {email, password};
            try {
                dispatch(AuthActions.login.started(params));
                AuthHelper.checkParams(params);
                const {jwt} = await requestsRepository.authenticationApiRequest.signIn(params as SignInRequestDto);
                dispatch(AuthActions.login.done({params, result: jwt}));
            } catch (error) {
                const errorSource = error.message == localization.errors.invalidEmail
                    ? "email"
                    : error.message == localization.errors.invalidPassword
                        ? "password"
                        : "both";
                const errorParams: IAuthParams = {...params, errorSource};
                dispatch(AuthActions.login.failed({params: errorParams, error}));
            }
        };
    }

    static getProfile(): SimpleThunk {
        return async (dispatch: Dispatch): Promise<void> => {
            try {
                dispatch(AuthActions.getProfile.started({}));
                const profile = await requestsRepository.profileApiRequest.getProfile();
                dispatch(AuthActions.getProfile.done({params: {}, result: profile}));
            } catch (error) {
                dispatch(AuthActions.getProfile.failed({params: {}, error}));
            }
        };
    }
}