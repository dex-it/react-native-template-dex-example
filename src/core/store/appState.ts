import {NavigationState, DrawerNavigationState} from "react-navigation";
import {EntitiesInitialState, IEntitiesState} from "../../modules/entities/entitiesState";
import {NavigationConfig} from "../../navigation/config";
import {ISystemState, SystemInitialState} from "./systemState";
import {AuthInitialState, IAuthState} from "../../modules/auth/authState";
import {IPlannedRunState, PlannedRunInitialState} from "../../modules/plannedRuns/plannedRunState";
import {CurrentRunInitialState, ICurrentRunState} from "../../modules/currentRun/currentRunState";

export interface IAppState {
    navigation: INavigationState;
    system: ISystemState;
    entities: IEntitiesState;
    auth: IAuthState;
    plannedRuns: IPlannedRunState;
    currentRun: ICurrentRunState;
}

export interface INavigationState {
    root: NavigationState;
    menu: DrawerNavigationState;
    currentRun: NavigationState;
    plannedRuns: NavigationState;
}

export function getAppInitialState(): IAppState {
    const NavigationInitialState: INavigationState = NavigationConfig.instance.getCombinedInitialState();

    return {
        navigation: NavigationInitialState,
        system: SystemInitialState,
        entities: EntitiesInitialState,
        auth: AuthInitialState,
        plannedRuns: PlannedRunInitialState,
        currentRun: CurrentRunInitialState
    };
}