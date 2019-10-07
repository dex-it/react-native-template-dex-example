import {
    createDrawerNavigator,
    NavigationAction,
    NavigationActions,
    NavigationComponent,
    NavigationState,
} from "react-navigation";
import {CoreActions} from "../../core/store";
import {IAppState} from "../../core/store/appState";
import {Colors, menuWidth} from "../../core/theme";
import {NavigationConfig} from "../config";
import {Menu} from "../menu/Menu";
import {NavigationPages} from "../navigation";

export const MenuNavigator = createDrawerNavigator({
    [NavigationPages.plannedRuns]: {
        getScreen: (): NavigationComponent => NavigationConfig.instance.getNavigationComponent("plannedRuns")
    },
    [NavigationPages.currentRun]: {
        getScreen: (): NavigationComponent => NavigationConfig.instance.getNavigationComponent("currentRun")
    },
}, {
    contentComponent: Menu,
    drawerWidth: menuWidth,
    drawerPosition: "left",
    drawerBackgroundColor: Colors.transparent
});

export const MenuNavigationInitialState = MenuNavigator.router.getStateForAction(NavigationActions.init({}), undefined);

export function menuNavigationReducer(
    state: NavigationState = MenuNavigationInitialState,
    action: NavigationAction): NavigationState {
    switch (action.type) {
        case CoreActions.rehydrate.type:
            const appState = (action as any).payload as IAppState;

            if (appState != null && appState.system.authToken != null && appState.entities.currentRun != null) {
                return {...MenuNavigationInitialState, index: 1};
            } else {
                return {...MenuNavigationInitialState, index: 0};
            }
        default:
            return MenuNavigator.router.getStateForAction(action, state);
    }
}