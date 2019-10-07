/*tslint:disable*/
import {BaseRequest} from "../BaseRequest";
import {SignInRequestDto} from "./dto/SignInRequest.g";
import {SignInResponseDto} from "./dto/SignInResponse.g";

export class AuthenticationApiRequest extends BaseRequest {
    constructor(protected baseurl: string) {
        super();
        this.signIn = this.signIn.bind(this);
    }

    signIn(signInRequest: SignInRequestDto): SignInResponseDto {
        return {jwt: "123"}
        // return this.fetch(`/api/v1/auth/sign_in`, {
        //     method: "POST",
        //     body: JSON.stringify(signInRequest)
        // })
        //     .then((response) => response.json())
        //     .catch(BaseRequest.handleError);
    }
}