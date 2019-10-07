import {NavigationRouter, NavigationState} from "react-navigation";
import {AnyAction} from "redux";
import {CoreActions} from "../core/store";

export function extendWithDontPushTwoPageInStack(router: NavigationRouter<NavigationState, AnyAction>): void {
    const defaultGetStateForAction = router.getStateForAction;

    router.getStateForAction = (action: AnyAction, lastState: NavigationState): NavigationState | null => {
        if (action.type == CoreActions.navigate.type
            && action.routeName == lastState.routes[lastState.index].routeName) {
            return lastState;
        } else {
            return defaultGetStateForAction(action, lastState);
        }
    };
}