import {LoadState} from "../../common/loadState";

export interface IPlannedRunState {
    loadState: LoadState;
    error?: string;
}

export const PlannedRunInitialState: IPlannedRunState = {
    loadState: LoadState.needLoad,
    error: "",
};