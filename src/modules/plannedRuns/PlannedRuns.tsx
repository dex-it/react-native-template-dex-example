import React from "react";
import {Dispatch} from "redux";
import {FlatListWrapper} from "../../common/components/FlatListWrapper";
import {PlainHeader} from "../../common/components/Headers";
import {MainModal} from "../../common/components/MainModal";
import {RunItem} from "../../common/components/RunItem";
import {TransparentButton} from "../../common/components/TransparentButton";
import {ButtonType} from "../../common/enums/buttonType";
import {defaultIdExtractor} from "../../common/helpers";
import {LoadState} from "../../common/loadState";
import {localization} from "../../common/localization/localization";
import {Run} from "../../core/api/generated/dto/Run.g";
import {BaseReduxComponent} from "../../core/BaseComponent";
import {connectAdv} from "../../core/store";
import {IAppState} from "../../core/store/appState";
import {NavigationActions} from "../../navigation/navigation";
import {PlannedRunsEmptyComponent} from "./components/PlannedRunsEmptyComponent";
import {PlannedRunsActionsAsync} from "./plannedRunsActionsAsync";

interface IStateProps {
    runs: Run[];
    loadState: LoadState;
    error?: string;
}

interface IDispatchProps {
    loadRuns(loadState: LoadState): void;
    navigateToRun(runId: string): void;
}

interface IState {
    isModalVisible: boolean;
    runId: string;
}

@connectAdv(
    (state: IAppState): IStateProps => ({
        runs: Array.from(state.entities.plannedRuns.values()),
        loadState: state.plannedRuns.loadState,
        error: state.plannedRuns.error
    }),
    (dispatch: Dispatch<any>): IDispatchProps => ({
        loadRuns: (loadState: LoadState): void => {
            dispatch(PlannedRunsActionsAsync.getRuns({loadState, perPage: 50}));
        },
        navigateToRun: (id: string): void => {
            dispatch(NavigationActions.navigateToRun({id}));
        },
    }))
export class PlannedRuns extends BaseReduxComponent<IStateProps, IDispatchProps, IState> {
    static navigationOptions = PlainHeader(localization.pages.plannedRuns, true, true);
    private keyExtractor = defaultIdExtractor;

    constructor(props: IEmpty) {
        super(props);
        this.state = {isModalVisible: false, runId: ""};
    }

    componentDidMount(): void {
        const {loadState, runs} = this.stateProps;
        if (loadState == LoadState.needLoad) {
            this.dispatchProps.loadRuns(runs.length == 0 ? LoadState.firstLoad : LoadState.refreshing);
        }
    }

    render(): JSX.Element {
        const {runs, loadState, error} = this.stateProps;
        const {isModalVisible, runId} = this.state;

        return (
            <React.Fragment>
                <FlatListWrapper
                    keyExtractor={this.keyExtractor}
                    loadState={loadState}
                    data={runs}
                    EmptyComponent={this.renderEmptyComponent as any}
                    tryAgain={this.tryAgain}
                    renderItem={this.renderRunItem}
                    onRefresh={this.pullToRefresh}
                    loadMore={this.loadMore}
                    errorText={error}
                />
                <MainModal
                    title={localization.runs.run + " " + runId}
                    body={localization.runs.executeRun}
                    isVisible={isModalVisible}
                    closeModal={this.closeModal}
                >
                    <TransparentButton
                        title={localization.common.no}
                        buttonType={ButtonType.disabled}
                        onPress={this.closeModal}
                    />
                    <TransparentButton
                        title={localization.runs.yesTakeARun}
                        buttonType={ButtonType.positive}
                        onPress={this.takeARun}
                    />
                </MainModal>
            </React.Fragment>
        );
    }

    private renderEmptyComponent = (): JSX.Element => {
        return <PlannedRunsEmptyComponent onRefreshPress={this.tryAgain}/>;
    };

    private renderRunItem = ({item}: { item: Run }): JSX.Element => {
        return (
            <RunItem
                key={item.id.toString()}
                runId={item.id.toString()}
                orderId={item.order.id.toString()}
                from={item.order.sender_address}
                to={item.order.recipient_address}
                cargoDescription={item.order.cargo}
                onTakePress={this.onTakePress}
            />
        );
    };

    private onTakePress = (runId: string): void => {
        this.setState({runId, isModalVisible: true});
    };

    private closeModal = (): void => {
        this.setState({isModalVisible: false});
    };

    private takeARun = (): void => {
        this.setState({isModalVisible: false});
        this.dispatchProps.navigateToRun(this.state.runId);
    };

    private tryAgain = (): void => {
        this.dispatchProps.loadRuns(LoadState.firstLoad);
    };

    private loadMore = (): void => {
        this.dispatchProps.loadRuns(LoadState.loadingMore);
    };

    private pullToRefresh = (): void => {
        this.dispatchProps.loadRuns(LoadState.pullToRefresh);
    };
}