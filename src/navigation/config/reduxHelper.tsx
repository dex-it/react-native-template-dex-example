import _ from "lodash";
import {NavigationActions, NavigationComponent, NavigationNavigator, NavigationState} from "react-navigation";
import {createReactNavigationReduxMiddleware, createReduxContainer} from "react-navigation-redux-helpers";
import {connect} from "react-redux";
import {AnyAction, applyMiddleware, Reducer} from "redux";
import {ReduxStack} from "redux-stack";
import {CoreActions, Reducers} from "../../core/store";
import {IAppState, INavigationState} from "../../core/store/appState";

export function reduxHelper(config: Config<INavigationState>): INavigationConfig<INavigationState> {
    const objects = _.mapValues(config, (value: IConfigItem, key): INavigationConfigItem => {
        const middleware =
            createReactNavigationReduxMiddleware((state: IAppState) => (state.navigation as any)[key], key);

        const App = createReduxContainer(value.navigator as any, key);
        const mapStateToProps = (state: IAppState): { state: NavigationState } => ({
            state: (state.navigation as any)[key],
        });
        const navigationComponent = connect(mapStateToProps, null)(App as any);

        (navigationComponent as any).navigationOptions = value.navigationOptions;

        const router = value.navigator.router;
        const initialState = router.getStateForAction(NavigationActions.init({}), null);

        const reducer = (state: NavigationState = initialState, action: AnyAction): NavigationState => {
            let processedState: NavigationState | null;

            processedState = value.customReducer != null ? value.customReducer(state, action) : null;

            if (processedState == state || processedState == null) {
                if (action.type == CoreActions.rehydrate.type) {
                    const rehydratedState: NavigationState = action.payload.navigation[key];
                    processedState = rehydratedState != null && value.isRehydrateEnabled ? rehydratedState : {...state};
                } else if (value.backAction != null && action.type == value.backAction.type) {
                    processedState = router.getStateForAction(NavigationActions.back(), state);
                } else {
                    processedState = router.getStateForAction(action, state);
                }
            }

            return processedState || state;
        };

        return {
            navigationComponent,
            reducer,
            initialState,
            middleware
        };
    });

    return {
        getNavigationComponent: (key): NavigationComponent => objects[key].navigationComponent,
        getReducer: (): Reducers<INavigationState> =>
            _.mapValues(objects, (i: INavigationConfigItem) => i.reducer) as any,
        getCombinedInitialState: (): INavigationState =>
            _.mapValues(objects, (i: INavigationConfigItem) => i.initialState) as any,
        reduxStack: {
            enhancers: _.values(objects).map(i => applyMiddleware(i.middleware))
        }
    };
}

export interface INavigationConfig<T> {
    getNavigationComponent: (key: keyof T) => NavigationComponent;
    getReducer: () => Reducers<INavigationState>;
    getCombinedInitialState: () => T;
    reduxStack: ReduxStack;
}

interface INavigationConfigItem {
    navigationComponent: NavigationComponent;
    reducer: Reducer<NavigationState>;
    initialState: NavigationState;
    middleware: any;
}

interface IConfigItem {
    backAction?: AnyAction;
    isRehydrateEnabled: boolean;
    navigator: NavigationNavigator<any, any, any>;
    customReducer?: Reducer<NavigationState>;
    navigationOptions: any;
}

type Config<T> = {
    [P in keyof T]?: IConfigItem;
};