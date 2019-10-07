import {Run} from "../../core/api/generated/dto/Run.g";
import {actionCreator} from "../../core/store";

export class CurrentRunActions {
    static getRun = actionCreator.async<IEmpty, Run | null, Error>("CurrentRun/GET");
}
