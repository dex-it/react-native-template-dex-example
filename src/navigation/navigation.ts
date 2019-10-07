import {AnyAction} from "redux";
import {INavigationState} from "../core/store";
import {Actions} from "./actions";
import {Pages} from "./pages";

const NavigationPages = new Pages();
const NavigationActions = new Actions();

export {NavigationActions, NavigationPages};

export function getBackAction(state: INavigationState): AnyAction | null {
    if (state.root.index != 0) {
        return NavigationActions.internal.backInRoot();
    } else {
        return null;
    }
}