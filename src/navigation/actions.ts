import {
    NavigationAction,
    NavigationActions,
    DrawerActions,
    NavigationToggleDrawerAction,
    NavigationCloseDrawerAction
} from "react-navigation";
import {SimpleThunk} from "../common/simpleThunk";
import {actionCreator} from "../core/store";
import {getBackAction} from "./navigation";
import {Pages} from "./pages";

const NavigationPages = new Pages();

function simpleToRoute(routeName: string): () => NavigationAction {
    return (): NavigationAction => NavigationActions.navigate({routeName});
}

function routeWithParams<T>(routeName: string): (params: T) => NavigationAction {
    return (params: T): NavigationAction => NavigationActions.navigate({routeName, params});
}

function toggleDrawer(): () => NavigationToggleDrawerAction {
    return (): NavigationToggleDrawerAction => DrawerActions.toggleDrawer();
}

function closeMenu(): () => NavigationCloseDrawerAction {
    return (): NavigationCloseDrawerAction => DrawerActions.closeDrawer();
}

export class Actions {
    toggleDrawer = toggleDrawer();
    closeMenu = closeMenu();

    navigateToInDevelopment = simpleToRoute(NavigationPages.inDeveloping);
    navigateToPlayground = simpleToRoute(NavigationPages.playground);
    navigateToCurrentRun = simpleToRoute(NavigationPages.currentRun);
    navigateToRun = routeWithParams<ICommonNavParams>(NavigationPages.currentRun);
    navigateToPlannedRuns = simpleToRoute(NavigationPages.plannedRuns);

    navigateToBack = (): SimpleThunk => {
        return async (dispatch, getState): Promise<void> => {
            const backAction = getBackAction(getState().navigation);

            if (backAction != null) {
                dispatch(backAction);
            }
        };
    };

    internal = {
        backInRoot: actionCreator("AppNavigation/BACK_IN_ROOT"),
    };
}

export interface ICommonNavParams {
    id: string;
}