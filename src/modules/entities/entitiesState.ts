import {Profile} from "../../core/api/generated/dto/Profile.g";
import {Run} from "../../core/api/generated/dto/Run.g";

export interface IEntitiesState {
    profile: Profile | null;
    plannedRuns: Map<string, Run>;
    currentRun: Run | null;
}

export const EntitiesInitialState: IEntitiesState = {
    profile: null,
    plannedRuns: new Map<string, Run>(),
    currentRun: null,
};