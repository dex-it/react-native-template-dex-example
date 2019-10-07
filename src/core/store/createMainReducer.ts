import {combineReducers} from "redux";
import {entitiesReducer} from "../../modules/entities/entitiesReducer";
import {NavigationConfig} from "../../navigation/config";
import {IAppState, INavigationState} from "./appState";
import {Reducers} from "./Reducers";
import {systemReducer} from "./systemReducer";
import {authReducer} from "../../modules/auth/authReducer";
import {plannedRunReducer} from "../../modules/plannedRuns/plannedRunReducer";
import {currentRunReducer} from "../../modules/currentRun/currentRunReducer";

export function createMainReducer(): any {
    const navigationReducers: Reducers<INavigationState> = NavigationConfig.instance.getReducer();

    const reducers: Reducers<IAppState> = {
        navigation: combineReducers(navigationReducers),
        system: systemReducer,
        entities: entitiesReducer,
        auth: authReducer,
        plannedRuns: plannedRunReducer,
        currentRun: currentRunReducer
    };

    return combineReducers(reducers);
}