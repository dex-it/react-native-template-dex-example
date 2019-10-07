import {createTransform} from "redux-persist";
import {IEntitiesState} from "./entitiesState";

export const entitiesStateTransform = createTransform(
    (state: IEntitiesState) => {
        return {
            ...state,
            plannedRuns: Array.from(state.plannedRuns) as any,
        };
    },
    (storedState: IEntitiesState) => {
        if (storedState) {
            return {
                ...storedState,
                plannedRuns: new Map(storedState.plannedRuns),
            };
        } else {
            return storedState;
        }
    },
    {
        whitelist: ["entities"]
    }
);