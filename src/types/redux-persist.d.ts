/* tslint:disable:unified-signatures */

declare module "redux-persist" {
    const REHYDRATE: string;
    const persistStore: any;
    const persistCombineReducers: any;
    const createTransform: any;

    export {persistCombineReducers, persistStore, createTransform};
}

declare module "redux-persist/es/integration/react" {
    const PersistGate: any;

    export {PersistGate};
}

declare module "redux-persist/es/storage" {
    const storage: any;

    export default storage;
}

declare module "redux-persist/es/persistReducer" {
    const persistReducer: any;

    export default persistReducer;
}

declare module "redux-persist/lib/constants" {
    const REHYDRATE: any;

    export {REHYDRATE};
}