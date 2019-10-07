import React, {PureComponent} from "react";
import {Text, TextStyle, TouchableOpacity, TouchableOpacityProperties, ViewStyle} from "react-native";
import {Colors, Fonts} from "../../core/theme";
import {styleSheetCreate, styleSheetFlatten} from "../utils";
import {ButtonType} from "../enums/buttonType";

interface IProps extends TouchableOpacityProperties {
    title: string;
    buttonType: ButtonType;
    style?: ViewStyle;
}

export class TransparentButton extends PureComponent<IProps> {
    render(): JSX.Element {
        const {title, style, buttonType, ...props} = this.props;

        return (
            <TouchableOpacity {...props} style={styleSheetFlatten([styles.button, style])}>
                <Text style={this.getTitleStyle(buttonType)} numberOfLines={1}>{title.toUpperCase()}</Text>
            </TouchableOpacity>
        );
    }

    private getTitleStyle = (buttonType: ButtonType): ViewStyle => {
        let titleStyle: TextStyle;

        switch (buttonType) {
            case ButtonType.positive:
                titleStyle = styles.positiveTitle;
                break;
            case ButtonType.negative:
                titleStyle = styles.negativeTitle;
                break;
            case ButtonType.disabled:
                titleStyle = styles.disabledTitle;
                break;
            default:
                throw new Error("Unknown button type");

        }

        return titleStyle;
    };
}

const commonTitle: TextStyle = {
    fontSize: 14,
    fontFamily: Fonts.medium,
    letterSpacing: 0.5,
    textAlign: "center"
};

const styles = styleSheetCreate({
    button: {
        padding: 20,
        backgroundColor: Colors.transparent,
        justifyContent: "center",
        alignItems: "center",
    } as ViewStyle,
    positiveTitle: styleSheetFlatten([commonTitle, {color: Colors.greenish}]) as ViewStyle,
    negativeTitle: styleSheetFlatten([commonTitle, {color: Colors.paleRed}]) as ViewStyle,
    disabledTitle: styleSheetFlatten([commonTitle, {color: Colors.warmGreyTwo}]) as ViewStyle,
    additionalContainer: styleSheetFlatten([commonTitle, {color: Colors.squash}]) as ViewStyle,
});