import React from "react";
import {ScrollView, Text, TextStyle, View, ViewStyle} from "react-native";
import {Dispatch} from "redux";
import {PlainHeader} from "../../common/components/Headers";
import {Indicator} from "../../common/components/Indicator";
import {MainButton} from "../../common/components/MainButton";
import {RunClause} from "../../common/components/RunClause";
import {ButtonType} from "../../common/enums/buttonType";
import {RunStatus} from "../../common/enums/runStatus";
import {localization} from "../../common/localization/localization";
import {testData} from "../../common/playground/Playground";
import {styleSheetCreate} from "../../common/utils";
import {Run} from "../../core/api/generated/dto/Run.g";
import {BaseReduxComponent} from "../../core/BaseComponent";
import {connectAdv} from "../../core/store";
import {IAppState} from "../../core/store/appState";
import {Colors, CommonStyles, Fonts} from "../../core/theme";
import {NavigationActions} from "../../navigation/navigation";
import {CurrentRunActionsAsync} from "./currentRunActionsAsync";

interface IStateProps {
    currentRun: Run | null;
    isLoading: boolean;
}

interface IDispatchProps {
    loadCurrentRun(): void;
    navigateToPlannedRuns(): void;
}

interface IState {
    isModalVisible: boolean;
}

@connectAdv(
    ({entities, currentRun}: IAppState): IStateProps => ({
        currentRun: entities.currentRun || testData.runs[0],
        isLoading: currentRun.isLoading
    }),
    (dispatch: Dispatch<any>): IDispatchProps => ({
        loadCurrentRun: (): void => {
            dispatch(CurrentRunActionsAsync.getCurrentRun(""));
        },
        navigateToPlannedRuns: (): void => {
            dispatch(NavigationActions.navigateToPlannedRuns());
        }
    })
)
export class CurrentRun extends BaseReduxComponent<IStateProps, IDispatchProps, IState> {
    static navigationOptions = PlainHeader(localization.pages.currentRun, true, true);

    constructor(props: IEmpty) {
        super(props);
        this.state = {isModalVisible: false};
    }

    render(): JSX.Element {
        const currentRun = this.stateProps.currentRun;

        if (currentRun == null) {
            return (
                <View style={emptyStyles.container}>
                    <Text style={emptyStyles.title}>{localization.empty.emptyCurrentRun}</Text>
                    <MainButton
                        onPress={this.dispatchProps.navigateToPlannedRuns}
                        title={localization.runs.toPlannedRuns}
                        buttonType={ButtonType.positive}
                    />
                </View>
            );
        } else {
            const {id, order} = currentRun;
            const {sender_address, recipient_address, cargo} = order;
            const runId = id.toString();

            return (
                <ScrollView style={CommonStyles.flexWhiteBackground} contentContainerStyle={styles.loadingContainer}>
                    {this.renderHeader(true, runId)}
                    <View style={styles.primaryDataContainer}>
                        <RunClause style={styles.clause} title={localization.runs.from} body={sender_address}/>
                        <RunClause style={styles.clause} title={localization.runs.to} body={recipient_address}/>
                        <RunClause style={styles.clause} title={localization.runs.cargo} body={cargo}/>
                    </View>
                    <View style={styles.inlineDataContainer}>
                        <RunClause
                            style={styles.inlineItemContainer}
                            title={localization.runs.distance}
                            body={100 + " " + localization.common.km}
                        />
                        <RunClause
                            style={styles.inlineItemContainer}
                            title={localization.runs.order}
                            body={order.id.toString()}
                        />
                    </View>
                </ScrollView>
            );
        }
    }

    private renderHeader = (isCargoLoading: boolean, runId: string): JSX.Element => {
        const status = getNextRunStatus("in_transit");

        return (
            <View style={styles.headerContainer}>
                <View style={styles.statusContainer}>
                    <Text style={styles.statusText}>{localization.runs.status.toUpperCase()}</Text>
                    <Indicator
                        style={isCargoLoading ? undefined : styles.statusUnloadingIndicator}
                        value={status.toLowerCase()}
                    />
                </View>
                <Text style={styles.runText}>{runId}</Text>
            </View>
        );
    };
}

const styles = styleSheetCreate({
    loadingContainer: {
        paddingBottom: 150
    } as ViewStyle,
    unloadingContainer: {
        paddingBottom: 90
    } as ViewStyle,
    headerContainer: {
        paddingTop: 13,
        paddingHorizontal: 16,
        alignItems: "center",
        justifyContent: "center"
    } as ViewStyle,
    statusContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    } as ViewStyle,
    statusText: {
        fontFamily: Fonts.medium,
        fontSize: 10,
        color: Colors.warmGreyTwo,
        paddingRight: 10
    } as TextStyle,
    statusUnloadingIndicator: {
        backgroundColor: Colors.azul
    } as ViewStyle,
    runText: {
        fontFamily: Fonts.medium,
        fontSize: 72,
        color: Colors.dark
    } as TextStyle,
    primaryDataContainer: {
        borderTopWidth: 1,
        borderTopColor: Colors.whiteTwo,
        borderBottomWidth: 1,
        borderBottomColor: Colors.whiteTwo,
        paddingTop: 8,
        paddingBottom: 24,
        marginBottom: 8
    } as ViewStyle,
    clause: {
        marginTop: 16,
        paddingHorizontal: 16
    } as ViewStyle,
    inlineDataContainer: {
        marginTop: 16,
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between"
    } as ViewStyle,
    inlineItemContainer: {
        marginTop: undefined
    } as ViewStyle,
    buttonsContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0
    } as ViewStyle
});

const emptyStyles = styleSheetCreate({
    container: {
        flex: 1,
        backgroundColor: Colors.whiteThree,
        alignItems: "stretch",
        justifyContent: "space-between",
    } as ViewStyle,
    title: {
        fontSize: 24,
        fontFamily: Fonts.medium,
        letterSpacing: 0.4,
        color: Colors.dark,
        padding: 24,
    } as TextStyle,
});

const getNextRunStatus = (status: string): string => {
    switch (status) {
        case RunStatus.started:
            return localization.runs.loadingStatus;
        case RunStatus.inTransit:
            return localization.runs.unloadingStatus;
        case RunStatus.waitingAcceptance:
            return localization.runs.invoicePhoto;
        case RunStatus.stoped:
            return localization.runs.stoped;
        case RunStatus.finished:
            return localization.runs.finished;
        case RunStatus.planned:
            return localization.runs.planned;
        case RunStatus.accepted:
            return localization.runs.accepted;
        case RunStatus.canceled:
            return localization.runs.canceled;
        default:
            return status;
    }
};
