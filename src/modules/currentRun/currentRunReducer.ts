import {reducerWithInitialState} from "typescript-fsa-reducers";
import {newState} from "../../common/newState";
import {CoreActions} from "../../core/store";
import {CurrentRunActions} from "./currentRunActions";
import {CurrentRunInitialState, ICurrentRunState} from "./currentRunState";

function rehydrate(): ICurrentRunState {
    return {...CurrentRunInitialState};
}

function getCurrentRunStartedHandler(state: ICurrentRunState): ICurrentRunState {
    return newState(state, {isLoading: true});
}

function getCurrentRunDoneHandler(state: ICurrentRunState): ICurrentRunState {
    return newState(state, {isLoading: false});
}

function getCurrentRunFailedHandler(state: ICurrentRunState): ICurrentRunState {
    return newState(state, {isLoading: false});
}

export const currentRunReducer = reducerWithInitialState(CurrentRunInitialState)
    .case(CoreActions.rehydrate, rehydrate)
    .case(CurrentRunActions.getRun.started, getCurrentRunStartedHandler)
    .case(CurrentRunActions.getRun.done, getCurrentRunDoneHandler)
    .case(CurrentRunActions.getRun.failed, getCurrentRunFailedHandler);
