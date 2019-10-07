import {actionCreator} from "../../core/store";
import {ErrorSource} from "./authState";
import {SignInRequestDto} from "../../core/api/generated/dto/SignInRequest.g";
import {Profile} from "../../core/api/generated/dto/Profile.g";

export class AuthActions {
    static login = actionCreator.async<IAuthParams, string, Error>("Auth/LOGIN");
    static logout = actionCreator("Auth/LOGOUT");
    static getProfile = actionCreator.async<IEmpty, Profile, Error>("Auth/GET_PROFILE");
}

export interface IAuthParams extends SignInRequestDto {
    errorSource?: ErrorSource;
}
