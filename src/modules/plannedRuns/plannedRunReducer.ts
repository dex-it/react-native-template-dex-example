import {Failure, Success} from "typescript-fsa";
import {reducerWithInitialState} from "typescript-fsa-reducers";
import {LoadState} from "../../common/loadState";
import {newState} from "../../common/newState";
import {Run} from "../../core/api/generated/dto/Run.g";
import {CoreActions} from "../../core/store";
import {IGetRunsParams, PlannedRunsActions} from "./plannedRunsActions";
import {IPlannedRunState, PlannedRunInitialState} from "./plannedRunState";

function rehydrate(): IPlannedRunState {
    return {...PlannedRunInitialState};
}

function getRunsStartedHandler(state: IPlannedRunState, {loadState}: IGetRunsParams): IPlannedRunState {
    return newState(state, {loadState});
}

function getRunsDoneHandler(state: IPlannedRunState, success: Success<IGetRunsParams, Run[]>): IPlannedRunState {
    const loadState = success.result.length < success.params.perPage ? LoadState.allIsLoaded : LoadState.idle;

    return newState(state, {loadState});
}

function getRunsFailedHandler(state: IPlannedRunState, failed: Failure<IGetRunsParams, Error>): IPlannedRunState {
    return newState(state, {loadState: LoadState.error, error: failed.error.message});
}

export const plannedRunReducer = reducerWithInitialState(PlannedRunInitialState)
    .case(CoreActions.rehydrate, rehydrate)
    .case(PlannedRunsActions.getRuns.started, getRunsStartedHandler)
    .case(PlannedRunsActions.getRuns.done, getRunsDoneHandler)
    .case(PlannedRunsActions.getRuns.failed, getRunsFailedHandler);
