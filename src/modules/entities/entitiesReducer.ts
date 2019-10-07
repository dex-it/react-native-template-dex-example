import {Success} from "typescript-fsa";
import {reducerWithInitialState} from "typescript-fsa-reducers";
import {defaultIdExtractor} from "../../common/helpers";
import {withNewElement, withNewElements} from "../../common/helpers/fromMap";
import {LoadState} from "../../common/loadState";
import {newState} from "../../common/newState";
import {Profile} from "../../core/api/generated/dto/Profile.g";
import {Run} from "../../core/api/generated/dto/Run.g";
import {CoreActions} from "../../core/store";
import {IAppState} from "../../core/store/appState";
import {AuthActions} from "../auth/authActions";
import {CurrentRunActions} from "../currentRun/currentRunActions";
import {IGetRunsParams, PlannedRunsActions} from "../plannedRuns/plannedRunsActions";
import {EntitiesInitialState, IEntitiesState} from "./entitiesState";

function rehydrateHandler(state: IEntitiesState, rehydratedState: IAppState): IEntitiesState {
    const nState = rehydratedState.entities || state;

    return newState(nState, {});
}

function getProfileDoneHandler(state: IEntitiesState, {result}: Success<IEmpty, Profile>): IEntitiesState {
    return newState(state, {profile: result});
}

function getRunsDoneHandler(state: IEntitiesState, {params, result}: Success<IGetRunsParams, Run[]>): IEntitiesState {
    let currentStateRuns: Map<string, Run>;
    switch (params.loadState) {
        case LoadState.firstLoad:
        case LoadState.pullToRefresh:
        case LoadState.refreshing:
            currentStateRuns = new Map<string, Run>();
            break;
        case LoadState.loadingMore:
            currentStateRuns = state.plannedRuns;
            break;
        default:
            throw new Error(`LoadState ${params.loadState} is not valid in this context.`);
    }
    const plannedRuns = withNewElements<string, Run>(currentStateRuns, result, defaultIdExtractor);

    return newState(state, {plannedRuns});
}

function getRunByIdDoneHandler(state: IEntitiesState, {params, result}: Success<string, Run>): IEntitiesState {
    const plannedRuns = withNewElement(state.plannedRuns, params, result);

    return newState(state, {plannedRuns});
}

function getCurrentRunDoneHandler(state: IEntitiesState, {result}: Success<IEmpty, Run | null>): IEntitiesState {
    return newState(state, {currentRun: result});
}

export const entitiesReducer = reducerWithInitialState(EntitiesInitialState)
    .case(CoreActions.rehydrate, rehydrateHandler)
    .case(AuthActions.getProfile.done, getProfileDoneHandler)
    .case(PlannedRunsActions.getRuns.done, getRunsDoneHandler)
    .case(PlannedRunsActions.getRunById.done, getRunByIdDoneHandler)
    .case(CurrentRunActions.getRun.done, getCurrentRunDoneHandler)
    .build();
