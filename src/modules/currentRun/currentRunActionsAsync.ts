import Toast from "react-native-simple-toast";
import {Dispatch} from "redux";
import {localization} from "../../common/localization/localization";
import {SimpleThunk} from "../../common/simpleThunk";
import {requestsRepository} from "../../core/api/requestsRepository";
import {CurrentRunActions} from "./currentRunActions";

export class CurrentRunActionsAsync {
    public static getCurrentRun(id: string): SimpleThunk {
        return async (dispatch: Dispatch): Promise<void> => {
            const params = {id};

            try {
                dispatch(CurrentRunActions.getRun.started(params));
                const result = await requestsRepository.runsApiRequest.getRunById(id);
                dispatch(CurrentRunActions.getRun.done({params, result}));
            } catch (error) {
                dispatch(CurrentRunActions.getRun.failed({params, error}));
                Toast.show(localization.errors.listErrorTitle + ": " + error.text);
            }
        };
    }
}