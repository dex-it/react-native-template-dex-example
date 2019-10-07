/// <reference types="jest" />

import {AuthHelper} from "../src/common/helpers/authHelper";
import {localization} from "../src/common/localization/localization";

describe("Auth tests", () => {
    test("Wrong email format", () => {
        expect(() => {
            AuthHelper.checkParams({email: "qq@q.q", password: "123456"});
        })
            .toThrowError(localization.errors.invalidEmail);
    });

    test("Wrong password format", () => {
        expect(() => {
            AuthHelper.checkParams({email: "qq@qq.qq", password: "12345"});
        })
            .toThrowError(localization.errors.invalidPassword);
    });
});
