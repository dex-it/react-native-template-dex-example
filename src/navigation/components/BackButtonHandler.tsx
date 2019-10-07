import {BackHandler} from "react-native";
import {NavigationStackScreenOptions} from "react-navigation";
import {Dispatch} from "redux";
import {AnyAction} from "typescript-fsa";
import {BaseReduxComponent} from "../../core/BaseComponent";
import {connectAdv} from "../../core/store";
import {IAppState, INavigationState} from "../../core/store/appState";
import {getBackAction} from "../navigation";

interface IStateProps {
    navigation: INavigationState;
}

interface IDispatchProps {
    dispatch: (action: AnyAction) => boolean;
}

@connectAdv(({navigation}: IAppState) => ({navigation}), (dispatch: Dispatch) => ({dispatch}))
export class BackButtonHandler extends BaseReduxComponent<IStateProps, IDispatchProps> {
    static navigationOptions: NavigationStackScreenOptions;

    constructor(props: any) {
        super(props);
        this.onBack = this.onBack.bind(this);
    }

    render(): JSX.Element | null {
        return null;
    }

    componentDidMount(): void {
        BackHandler.addEventListener("hardwareBackPress", this.onBack);
    }

    componentWillUnmount(): void {
        BackHandler.removeEventListener("hardwareBackPress", this.onBack);
    }

    shouldComponentUpdate(): boolean {
        return false;
    }

    private onBack(): boolean {
        const dispatch = this.dispatchProps.dispatch;
        const navigation = this.stateProps.navigation;
        let processed = false;

        const backAction = getBackAction(navigation);

        if (backAction != null) {
            dispatch(backAction);

            processed = true;
        }

        return processed;
    }
}