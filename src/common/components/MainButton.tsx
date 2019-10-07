import React, {PureComponent} from "react";
import {
    ImageStyle,
    ImageURISource,
    Text,
    TextStyle,
    TouchableHighlight,
    TouchableHighlightProperties,
    View,
    ViewStyle,
    Image,
    TouchableNativeFeedback
} from "react-native";
import {Colors, Fonts} from "../../core/theme";
import {styleSheetCreate, styleSheetFlatten} from "../utils";
import {ButtonType} from "../enums/buttonType";
import {isAndroidAndLollipopOrHigher} from "../../core/theme/common";

interface IProps extends TouchableHighlightProperties {
    title: string;
    containerStyle?: ViewStyle;
    icon?: ImageURISource;
    iconStyle?: ImageStyle;
    buttonType: ButtonType;
}

export class MainButton extends PureComponent<IProps> {
    render(): JSX.Element {
        const {...props} = this.props;

        if (isAndroidAndLollipopOrHigher) {
            return (
                <TouchableNativeFeedback {...props}>
                    {this.renderContent()}
                </TouchableNativeFeedback>
            );
        } else {
            return (
                <TouchableHighlight {...props}>
                    {this.renderContent()}
                </TouchableHighlight>
            );
        }
    }

    private renderContent = (): JSX.Element => {
        const {title, buttonType, containerStyle, icon, iconStyle} = this.props;

        return (
            <View style={this.getContainerStyle(buttonType, containerStyle)}>
                {this.renderIcon(icon, iconStyle)}
                <Text style={styles.title} numberOfLines={1}>{title.toUpperCase()}</Text>
            </View>
        );
    };

    private getContainerStyle = (buttonType: ButtonType, modifiedStyle?: ViewStyle): ViewStyle => {
        let containerStyle: ViewStyle;

        switch (buttonType) {
            case ButtonType.positive:
                containerStyle = styles.positiveContainer;
                break;
            case ButtonType.negative:
                containerStyle = styles.negativeContainer;
                break;
            case ButtonType.disabled:
                containerStyle = styles.disabledContainer;
                break;
            case ButtonType.additional:
                containerStyle = styles.additionalContainer;
                break;
            default:
                throw new Error("Unknown button type");

        }

        return styleSheetFlatten([containerStyle, modifiedStyle]) as ViewStyle;
    };

    private renderIcon = (icon?: ImageURISource, iconStyle?: ImageStyle): JSX.Element | null => {
        return icon != null ? <Image source={icon} style={styleSheetFlatten([styles.icon, iconStyle])}/> : null;
    };
}

const mainContainer: ViewStyle = {
    flexDirection: "row",
    backgroundColor: Colors.greenish,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
};

const styles = styleSheetCreate({
    positiveContainer: styleSheetFlatten([mainContainer, {backgroundColor: Colors.greenish}]) as ViewStyle,
    negativeContainer: styleSheetFlatten([mainContainer, {backgroundColor: Colors.paleRed}]) as ViewStyle,
    disabledContainer: styleSheetFlatten([mainContainer, {backgroundColor: Colors.warmGreyTwo}]) as ViewStyle,
    additionalContainer: styleSheetFlatten([mainContainer, {backgroundColor: Colors.squash}]) as ViewStyle,
    title: {
        fontSize: 20,
        fontFamily: Fonts.regular,
        color: Colors.white,
        letterSpacing: 3,
        textAlign: "center"
    } as TextStyle,
    icon: {
        height: 24,
        resizeMode: "contain",
        marginRight: 11.5,
    } as ImageStyle,
});