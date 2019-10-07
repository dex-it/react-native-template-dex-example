import React from "react";
import {BaseReduxComponent} from "../../core/BaseComponent";
import {connectAdv} from "../../core/store";
import {IAppState} from "../../core/store/appState";
import {LoadingView} from "./LoadingView";

interface IStateProps {
    isLoading: boolean;
}

@connectAdv((state: IAppState): IStateProps => ({
    isLoading: state.auth.isAuthenticating
}))
export class RootLoadingView extends BaseReduxComponent<IStateProps, IEmpty> {
    render(): JSX.Element {
        return <LoadingView isLoading={this.stateProps.isLoading} transparent={false}/>;
    }
}