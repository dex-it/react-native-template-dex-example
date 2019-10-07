import {connect} from "react-redux";
import {Dispatch} from "redux";
import {IReduxProps} from "../BaseComponent";
import {IAppState} from "./appState";

export function connectAdv<IStateProps, IDispatchProps>
(mapState: ((state: IAppState, ownProps: any) => IStateProps) | null,
 mapDispatch?: (dispatch: Dispatch, ownProps: any) => IDispatchProps): any {
    return connect(mapState, mapDispatch as any, merge) as any;
}

function merge<IStateProps, IDispatchProps>(
    stateProps: IStateProps,
    dispatchProps: IDispatchProps,
    ownProps: any): IReduxProps<IStateProps, IDispatchProps> {
    return Object.assign({}, ownProps, {
        stateProps,
        dispatchProps
    });
}