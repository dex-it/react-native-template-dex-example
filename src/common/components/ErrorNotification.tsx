import React, {PureComponent} from "react";
import {Text, TextStyle, TouchableHighlight, TouchableNativeFeedback, View, ViewStyle} from "react-native";
import {Colors, Fonts} from "../../core/theme";
import {styleSheetCreate, styleSheetFlatten} from "../utils";
import {isAndroidAndLollipopOrHigher} from "../../core/theme/common";
import {localization} from "../localization/localization";

interface IProps {
    errorText: string;
    onOkPress: () => void;
}

export class ErrorNotification extends PureComponent<IProps> {
    render(): JSX.Element | null {
        const errorText = this.props.errorText;

        if (errorText != null) {
            return (
                <View style={styles.container}>
                    <Text style={styles.errorText} numberOfLines={2}>{errorText}</Text>
                    {this.renderButton()}
                </View>
            );
        } else {
            return null;
        }
    }

    private renderButton = (): JSX.Element | null => {
        if (isAndroidAndLollipopOrHigher) {
            return (
                <TouchableNativeFeedback onPress={this.props.onOkPress}>
                    <Text style={styles.okText}>{localization.common.ok.toUpperCase()}</Text>
                </TouchableNativeFeedback>
            );
        } else {
            return (
                <TouchableHighlight onPress={this.props.onOkPress} underlayColor={Colors.highlightPaleRed}>
                    <Text style={styles.okText}>{localization.common.ok.toUpperCase()}</Text>
                </TouchableHighlight>
            );
        }
    }
}

const commonText = {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.white,
    padding: 16,
} as TextStyle;

const styles = styleSheetCreate({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: Colors.paleRed,
    } as ViewStyle,
    errorText: styleSheetFlatten([commonText, {flex: 1}]) as TextStyle,
    okText: styleSheetFlatten([commonText]) as TextStyle,
});