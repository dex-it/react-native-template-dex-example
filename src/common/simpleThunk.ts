import {ThunkAction} from "redux-thunk";
import {IAppState} from "../core/store/appState";
import {Action} from "redux";

export type SimpleThunk = ThunkAction<void, IAppState, Error, Action>;