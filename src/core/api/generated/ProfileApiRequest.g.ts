import {testData} from "../../../common/playground/Playground";

/*tslint:disable*/
import {BaseRequest} from "../BaseRequest";
import {Profile} from "./dto/Profile.g";

export class ProfileApiRequest extends BaseRequest {
    constructor(protected baseurl: string) {
        super();
        this.getProfile = this.getProfile.bind(this);
    }

    getProfile(): Profile {
        return testData.profile;
        // return this.fetch(`/api/v1/profile`, {
        //     method: "GET",
        // })
        //     .then((response) => response.json())
        //     .catch(BaseRequest.handleError);
    }
}