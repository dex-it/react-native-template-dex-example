import _ from "lodash";
import moment from "moment";
import React, {ErrorInfo, PureComponent} from "react";
import {UIManager, View} from "react-native";
import DevMenu from "react-native-dev-menu";
import {Provider} from "react-redux";
import {Store} from "redux";
import {PersistGate} from "redux-persist/integration/react";
import {RootLoadingView} from "./common/components/RootLoadingView";
import {Splash} from "./common/components/Splash";
import {UnhandledError} from "./common/components/UnhandledError";
import {EventNames, eventRegister} from "./common/eventRegister";
import {BaseRequest} from "./core/api";
import {appSettingsProvider} from "./core/settings";
import {IAppState} from "./core/store/appState";
import {configureStore, MigrateStoreMode} from "./core/store/configureStore";
import {SystemActions} from "./core/store/systemActions";
import {CommonStyles} from "./core/theme";
import {BackButtonHandler} from "./navigation/components/BackButtonHandler";
import {NavigationConfig} from "./navigation/config";
import {initNavigationConfig} from "./navigation/config/initNavigationConfig";
import {NavigationActions} from "./navigation/navigation";
/* tslint:disable:no-var-requires */
require("moment/locale/ru");

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

initNavigationConfig();

moment.locale("ru");

interface IState {
    isError: boolean;
}

export class App extends PureComponent<IEmpty, IState> {
    private store: Store<IAppState>;
    private persistor: any;
    private logoutListenerId: string;

    constructor(props: IEmpty) {
        super(props);
        this.onStoreConfigured = this.onStoreConfigured.bind(this);
        this.resetState = this.resetState.bind(this);
        this.forceResetApp = this.forceResetApp.bind(this);
        this.logout = this.logout.bind(this);
        this.createStore(appSettingsProvider.settings.devOptions.purgeStateOnStart
            ? MigrateStoreMode.purge
            : MigrateStoreMode.none
        );

        this.state = {isError: false};
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.warn("UnhandledError with Info: ", errorInfo);
        this.setState({isError: true});
    }

    componentDidMount(): void {
        this.logoutListenerId = eventRegister.addEventListener(EventNames.logout, this.logout);
    }

    private logout(): void {
        this.setState({isError: true}, () => {
            setTimeout(() => this.resetState(MigrateStoreMode.resetStateWithToken), 100);
        });
    }

    componentWillUnmount(): void {
        eventRegister.removeEventListener(this.logoutListenerId);
    }

    render(): JSX.Element {
        if (this.state.isError) {
            return <UnhandledError onReset={this.forceResetApp}/>;
        } else {
            const RootNavigation = NavigationConfig.instance.getNavigationComponent("root");

            return (
                <Provider store={this.store}>
                    <PersistGate loading={<Splash/>} persistor={this.persistor}>
                        <View style={CommonStyles.flex1}>
                            <BackButtonHandler/>
                            <RootNavigation/>
                            <RootLoadingView/>
                        </View>
                    </PersistGate>
                </Provider>
            );
        }
    }

    private onStoreConfigured(): void {
        if (__DEV__) {
            DevMenu.addItem(
                "Navigate to Playground",
                () => this.store.dispatch(NavigationActions.navigateToPlayground())
            );
        }

        BaseRequest.globalOptions = {
            setToken: (t: string): any => this.store.dispatch(SystemActions.setToken(t)),
            getToken: (): string | null => this.store.getState().system.authToken,
            onAuthError: _.debounce(() => {
                this.logout();
            }, 600),
        };
    }

    private createStore(mode: MigrateStoreMode): void {
        const {store, persistor} = configureStore(() => {
            console.log("configureStore");
        }, {migrateMode: mode});
        this.onStoreConfigured();
        this.store = store;
        this.persistor = persistor;
    }

    private resetState(mode: MigrateStoreMode): void {
        this.createStore(mode);
        this.setState({isError: false});
    }

    private forceResetApp(): void {
        this.setState({isError: true}, () => {
            this.resetState(MigrateStoreMode.resetStatePreserveToken);
        });
    }
}