import React from "react";

export abstract class BaseReduxComponent<TSP, TDP, TS= {}, TOwnProps = {}>
    extends React.Component<IReduxProps<TSP, TDP, TOwnProps>, TS> {
    get dispatchProps(): TDP {
        return (this.props as any).dispatchProps;
    }

    get stateProps(): TSP {
        return (this.props as any).stateProps;
    }
}

export type IReduxProps<TStateProps, TDispatchProps, TOwnProps = {}> = {
    [key in keyof TOwnProps] : TOwnProps[key]
    } & {
    readonly stateProps?: TStateProps;
    readonly dispatchProps?: TDispatchProps;
};