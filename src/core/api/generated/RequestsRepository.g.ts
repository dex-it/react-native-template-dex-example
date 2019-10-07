import {AuthenticationApiRequest} from "./AuthenticationApiRequest.g";
import {ProfileApiRequest} from "./ProfileApiRequest.g";
import {RunsApiRequest} from "./RunsApiRequest.g";

export class RequestsRepository {
    authenticationApiRequest = new AuthenticationApiRequest(this.baseurl);
    profileApiRequest = new ProfileApiRequest(this.baseurl);
    runsApiRequest = new RunsApiRequest(this.baseurl);

    constructor(private baseurl: string) {
    }
}