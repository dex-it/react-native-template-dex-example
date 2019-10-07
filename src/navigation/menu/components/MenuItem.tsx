import React, {PureComponent} from "react";
import {
    Text,
    TextStyle,
    TouchableHighlight,
    TouchableHighlightProperties,
    TouchableNativeFeedback,
    View,
    ViewStyle
} from "react-native";
import {Indicator} from "../../../common/components/Indicator";
import {styleSheetCreate, styleSheetFlatten} from "../../../common/utils";
import {Colors, Fonts, isIos} from "../../../core/theme";

interface IProps extends TouchableHighlightProperties {
    title: string;
    indicatorValue?: string;
    isBottom?: boolean;
}

export class MenuItem extends PureComponent<IProps> {
    render(): JSX.Element {
        const {...props} = this.props;

        if (isIos) {
            return (
                <TouchableHighlight {...props}>
                    {this.renderContent()}
                </TouchableHighlight>
            );
        } else {
            return (
                <TouchableNativeFeedback {...props}>
                    {this.renderContent()}
                </TouchableNativeFeedback>
            );
        }
    }

    private renderContent = (): JSX.Element => {
        const {title, isBottom, indicatorValue} = this.props;

        return(
            <View style={isBottom ? styles.bottomButton : styles.button}>
                <Text style={styles.title} numberOfLines={1}>{title.toUpperCase()}</Text>
                {this.renderIndicator(indicatorValue)}
            </View>
        );
    };

    private renderIndicator = (indicatorValue: string | undefined): JSX.Element | null => {
        return indicatorValue != null ? <Indicator value={indicatorValue}/> : null;
    };
}

const commonButton: ViewStyle = {
    padding: 24,
    backgroundColor: Colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: Colors.whiteTwo,
};

const styles = styleSheetCreate({
    button: styleSheetFlatten([commonButton]) as ViewStyle,
    bottomButton: styleSheetFlatten([commonButton, {borderBottomWidth: undefined, borderTopWidth: 1}]) as ViewStyle,
    title: {
        flex: 1,
        fontSize: 14,
        fontFamily: Fonts.medium,
        color: Colors.black,
    } as TextStyle,
});