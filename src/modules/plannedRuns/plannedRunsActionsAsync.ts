import {Dispatch} from "redux";
import {LoadState} from "../../common/loadState";
import {SimpleThunk} from "../../common/simpleThunk";
import {requestsRepository} from "../../core/api/requestsRepository";
import {IAppState} from "../../core/store/appState";
import {IGetRunsParams, PlannedRunsActions} from "./plannedRunsActions";

export class PlannedRunsActionsAsync {
    static getRuns(params: IGetRunsParams): SimpleThunk {
        return async (dispatch: Dispatch, getState: () => IAppState): Promise<void> => {
            try {
                dispatch(PlannedRunsActions.getRuns.started(params));
                let pageNumber = 1;
                if (params.loadState == LoadState.loadingMore) {
                    const plannedRuns = getState().entities.plannedRuns;
                    pageNumber = Math.trunc(plannedRuns.size / 50) + 1;
                }
                const result = await requestsRepository.runsApiRequest.getRuns(pageNumber);

                dispatch(PlannedRunsActions.getRuns.done({params, result}));

            } catch (error) {
                dispatch(PlannedRunsActions.getRuns.failed({params, error}));
            }
        };
    }
}
