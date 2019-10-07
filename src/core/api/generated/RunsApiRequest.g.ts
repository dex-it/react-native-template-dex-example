//TODO: Temporary ignore until this won't land in the master: https://github.com/joltup/rn-fetch-blob/pull/184
// @ts-ignore
import {FetchBlobResponse} from "rn-fetch-blob";
import {testData} from "../../../common/playground/Playground";
import {BaseRequest} from "../BaseRequest";

import {Run} from "./dto/Run.g";

export class RunsApiRequest extends BaseRequest {
    constructor(protected baseurl: string) {
        super();
        this.getRuns = this.getRuns.bind(this);
        this.getRunById = this.getRunById.bind(this);

    }

    getRuns(pageNumber: number): Run[] {
        return testData.runs;
        // return this.fetch(`/api/v1/runs?status[]=planned&page=${pageNumber}`, {
        //     method: "GET"
        // })
        //     .then((response) => response.json())
        //     .catch(BaseRequest.handleError);
    }

    getRunById(runId: string): Run {
        return testData.runs.find(item => item.id == runId) || testData.runs[0];
        // return this.fetch(`/api/v1/runs/${runId}`, {method: "GET"})
        //     .then((response) => response.json())
        //     .catch(BaseRequest.handleError);
    }
}
