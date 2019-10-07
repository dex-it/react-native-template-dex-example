import React, {PureComponent} from "react";
import {Text, TextStyle, View, ViewStyle} from "react-native";
import {Colors, Fonts} from "../../core/theme";
import {styleSheetCreate, styleSheetFlatten} from "../utils";

interface IProps {
    title: string;
    body?: string;
    style?: ViewStyle;
}

export class RunClause extends PureComponent<IProps> {
    render(): JSX.Element | null {
        const {title, body, style} = this.props;

        if (body != null) {
            return (
                <View style={styleSheetFlatten([styles.container, style])}>
                    <Text style={textStyles.title}>{title.toUpperCase()}</Text>
                    <Text style={textStyles.body}>{body}</Text>
                </View>
            );
        } else {
            return null;
        }
    }
}

const styles = styleSheetCreate({
    container: {
        marginTop: 12,
        paddingHorizontal: 18,
    } as ViewStyle,
    headerClause: {
        marginTop: undefined,
        paddingHorizontal: 10,
    } as ViewStyle,
});

const textStyles = styleSheetCreate({
    title: {
        fontSize: 10,
        fontFamily: Fonts.medium,
        color: Colors.warmGreyTwo,
    } as TextStyle,
    body: {
        fontSize: 14,
        fontFamily: Fonts.medium,
        color: Colors.dark,
        lineHeight: 20,
    } as TextStyle,
});