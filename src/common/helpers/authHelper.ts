import {localization} from "../localization/localization";
import {IAuthParams} from "../../modules/auth/authActions";

export class AuthHelper {
    static checkParams(params: IAuthParams): void {
        this.isEmail(params.email);
        this.checkPassword(params.password);
    }

    static isEmail(login: string): void {
        //tslint:disable
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const regexTest = emailRegex.test(login);

        if (!regexTest) {
            throw new Error(localization.errors.invalidEmail);
        }
    }

    static checkPassword(password: string): void {
        if (password.length < 6) {
            throw new Error(localization.errors.invalidPassword);
        }
    }
}