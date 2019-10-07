import React, {PureComponent} from "react";
import {Text, TextStyle, View, ViewStyle} from "react-native";
import {Colors, Fonts} from "../../core/theme";
import {styleSheetCreate} from "../utils";
import {localization} from "../localization/localization";
import {MainButton} from "./MainButton";
import {ButtonType} from "../enums/buttonType";
import {RunClause} from "./RunClause";

interface IProps {
    runId: string;
    orderId: string;

    from: string;
    to: string;
    cargoDescription: string;

    onTakePress?: (runId: string) => void;
}

export class RunItem extends PureComponent<IProps> {
    render(): JSX.Element {
        const {runId, orderId, from, to, cargoDescription, onTakePress} = this.props;

        return (
            <View style={styles.container}>
                {this.renderHeader(runId, orderId)}
                <RunClause title={localization.runs.from} body={from} style={styles.topMostClause}/>
                <RunClause title={localization.runs.to} body={to}/>
                <RunClause title={localization.runs.cargo} body={cargoDescription} style={styles.bottomMostClause}/>
                {this.renderButton(onTakePress)}
            </View>
        );
    }

    private renderButton = (onTakePress?: (runId: string) => void): JSX.Element | null => {
        if (onTakePress != null) {
           return (
               <MainButton
                   title={localization.runs.takeARun}
                   buttonType={ButtonType.positive}
                   onPress={this.onTakePress}
               />
           );
        } else {
            return null;
        }
    };

    private onTakePress = (): void => {
        this.props.onTakePress!(this.props.runId);
    };

    private renderHeader = (runId: string, orderId: string): JSX.Element => {
        return (
            <View style={styles.header}>
                <Text style={textStyles.numberSign}>
                    {"№"}
                    <Text style={textStyles.run}>{runId}</Text>
                </Text>
                <RunClause title={localization.runs.order} body={orderId} style={styles.headerClause}/>
            </View>
        );
    };
}

const styles = styleSheetCreate({
    container: {
        flex: 1,
        margin: 8,
        backgroundColor: Colors.white,
    } as ViewStyle,
    header: {
        backgroundColor: Colors.white,
        flexDirection: "row",
        paddingLeft: 18,
        paddingVertical: 5,
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: Colors.whiteTwo,
    } as ViewStyle,
    headerClause: {
        marginTop: undefined,
        paddingHorizontal: 10,
    } as ViewStyle,
    topMostClause: {
        marginTop: 16,
    } as ViewStyle,
    bottomMostClause: {
        marginBottom: 16,
    } as ViewStyle,
    emptySpace: {
        height: 60,
    } as ViewStyle,
});

const textStyles = styleSheetCreate({
    numberSign: {
        fontSize: 24,
        fontFamily: Fonts.medium,
        color: Colors.dark,
    } as TextStyle,
    run: {
        flex: 1,
        fontSize: 32,
        fontFamily: Fonts.medium,
        color: Colors.dark,
    } as TextStyle,
});