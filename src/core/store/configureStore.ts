import {AnyAction, createStore, Store} from "redux";
import {persistStore} from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import {PersistConfig} from "redux-persist/es/types";
import {buildStack} from "redux-stack";
import {newState} from "../../common/newState";
import {ignorePromise} from "../../common/utils";
import {IEntitiesState} from "../../modules/entities/entitiesState";
import {NavigationConfig} from "../../navigation/config";
import {bugsnagLog, BugsnapConfiguration} from "../BugsnapConfiguration";
import {appSettingsProvider} from "../settings";
import {getAppInitialState, IAppState} from "./appState";
import {createMainReducer} from "./createMainReducer";
import {keyboardDismissOnNavigation} from "./init/keyboardClose";
import {reduxLoggerInit} from "./init/loggerInit";
import {promiseInit} from "./init/promiseInit";
import {thunkInit} from "./init/thunkInit";
import {entitiesStateTransform} from "../../modules/entities";
import AsyncStorage from "@react-native-community/async-storage";

export enum MigrateStoreMode {
    none = "none",
    purge = "purge",
    resetStatePreserveToken = "resetStatePreserveToken",
    resetStateWithToken = "resetStateWithToken"
}

export function configureStore(
    callback: () => void,
    options: { migrateMode: MigrateStoreMode }): { store: Store<IAppState>, persistor: any } {
    const {enhancer} = buildStack([
        thunkInit,
        promiseInit,
        NavigationConfig.instance.reduxStack,
        reduxLoggerInit,
        bugsnagLog,
        keyboardDismissOnNavigation]);

    const migrateStore: Map<MigrateStoreMode, (state: IAppState) => Promise<IAppState>> = new Map();
    migrateStore.set(MigrateStoreMode.purge, () => Promise.resolve(getAppInitialState()));
    migrateStore.set(MigrateStoreMode.none, tryProcessStateUpdate);
    migrateStore.set(MigrateStoreMode.resetStatePreserveToken, resetState);
    migrateStore.set(MigrateStoreMode.resetStateWithToken, resetStateWithToken);

    const persistConfig: PersistConfig = {
        key: "root",
        storage: AsyncStorage,
        debug: appSettingsProvider.settings.environment == "Development",
        migrate: migrateStore.get(options.migrateMode)! as any,
        transforms: [entitiesStateTransform],
    };
    const combinedReducer = createMainReducer();
    const mainReducer = persistReducer(persistConfig, combinedReducer);
    const store = createStore<IAppState, AnyAction, {}, {}>(mainReducer, enhancer);
    const persistor = persistStore(store, undefined, callback);
    if (options.migrateMode == MigrateStoreMode.purge) {
        ignorePromise(persistor.purge());
    }

    return {store, persistor};
}

function tryProcessStateUpdate(state: IAppState): Promise<IAppState> {
    const AppInitialState = getAppInitialState();

    if (state == null) {
        return Promise.resolve(AppInitialState);
    }

    const nState: IAppState = state;

    const fromBuild = nState.system.buildNumber;

    let resultState: IAppState;
    if (fromBuild < appSettingsProvider.settings.build) {
        const metadata = {
            from: fromBuild,
            to: appSettingsProvider.settings.build
        };
        console.warn("UpdateState", metadata);
        BugsnapConfiguration.runIfConfigured(client => client.leaveBreadcrumb("upgrade", metadata));

        resultState = newState(AppInitialState, {
            system: {
                buildNumber: appSettingsProvider.settings.build,
                authToken: nState.system.authToken,
                notificationInfo: nState.system.notificationInfo,
            },
            entities: {
                plannedRuns: new Map(),
            } as IEntitiesState
        });
    } else {
        resultState = Object.assign({}, AppInitialState, nState);
    }

    return Promise.resolve(resultState);
}

function resetStateWithToken(state: IAppState): Promise<IAppState> {
    const AppInitialState = getAppInitialState();

    if (state == null) {
        return Promise.resolve(AppInitialState);
    }

    return Promise.resolve(newState(AppInitialState,
        {
            system: {
                buildNumber: appSettingsProvider.settings.build,
                authToken: null,
                notificationInfo: state.system.notificationInfo,
            },
            entities: {
                plannedRuns: new Map(),
            } as IEntitiesState
        }));
}

function resetState(state: IAppState): Promise<IAppState> {
    const AppInitialState = getAppInitialState();

    if (state == null) {
        return Promise.resolve(AppInitialState);
    }

    return Promise.resolve(newState(AppInitialState,
        {
            system: {
                buildNumber: state.system.buildNumber,
                authToken: state.system.authToken,
                notificationInfo: state.system.notificationInfo,
            },
            entities: {
                plannedRuns: new Map(),
            } as IEntitiesState
        }));
}