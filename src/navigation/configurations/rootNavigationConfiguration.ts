import {
    createStackNavigator,
    NavigationAction,
    NavigationActions,
    NavigationComponent,
    NavigationState,
    StackActions
} from "react-navigation";
import {InDeveloping} from "../../common/components/InDeveloping";
import {Playground} from "../../common/playground";
import {CoreActions} from "../../core/store";
import {IAppState} from "../../core/store/appState";
import {Colors, isIos} from "../../core/theme";
import {AuthActions} from "../../modules/auth/authActions";
import {AuthPage} from "../../modules/auth/AuthPage";
import {NavigationConfig} from "../config";
import {extendWithDontPushTwoPageInStack} from "../extendWithDontPushTwoPageInStack";
import {NavigationPages} from "../navigation";

export const RootNavigator = createStackNavigator({
    [NavigationPages.login]: {screen: AuthPage},
    [NavigationPages.playground]: {screen: Playground},
    [NavigationPages.inDeveloping]: {screen: InDeveloping},
    [NavigationPages.menu]: {
        getScreen: (): NavigationComponent => NavigationConfig.instance.getNavigationComponent("menu")
    },
}, {
    headerMode: "screen",
    cardStyle: {
        backgroundColor: isIos ? Colors.white : Colors.transparent
    },
});

extendWithDontPushTwoPageInStack(RootNavigator.router);

export const RootNavigationInitialState = RootNavigator.router.getStateForAction(NavigationActions.init({}), undefined);

export function rootNavigationReducer(
    state: NavigationState = RootNavigationInitialState,
    action: NavigationAction): NavigationState {
    switch (action.type) {
        case CoreActions.rehydrate.type:
            const appState = (action as any).payload as IAppState;

            if (appState != null && appState.system.authToken != null) {
                return RootNavigator.router.getStateForAction(StackActions.reset(
                    {
                        index: 0,
                        actions: [
                            NavigationActions.navigate({
                                routeName: NavigationPages.menu,
                            })
                        ]
                    }
                ), state);
            }

            return {...RootNavigationInitialState};
        case AuthActions.login.done.type:
            return RootNavigator.router.getStateForAction(StackActions.reset(
                {
                    index: 0,
                    actions: [
                        NavigationActions.navigate({
                            routeName: NavigationPages.menu,
                        })
                    ]
                }
            ), state);
        default:
            return RootNavigator.router.getStateForAction(action, state);
    }
}