import {LoadState} from "../../common/loadState";
import {Run} from "../../core/api/generated/dto/Run.g";
import {actionCreator} from "../../core/store";

export class PlannedRunsActions {
    static getRuns = actionCreator.async<IGetRunsParams, Run[], Error>("PlannedRuns/GET_RUNS");
    static getRunById = actionCreator.async<string, Run, Error>("PlannedRuns/GET_RUN");
}

export interface IGetRunsParams {
    loadState: LoadState;
    perPage: number;
}
