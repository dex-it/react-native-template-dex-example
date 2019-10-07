import _ from "lodash";
import React, {PureComponent} from "react";
import {Text, View, ViewStyle} from "react-native";
import {styleSheetCreate} from "../utils";

const visibleItems: string[] = [];

export class PlaygroundItem extends PureComponent<IProps> {
    static VisibleItems: string[] = visibleItems;

    render(): JSX.Element | null {
        if (_.isEmpty(visibleItems) || visibleItems.indexOf(this.props.header) != -1) {
            return (
                <View>
                    <Text style={styles.header}>{this.props.header}</Text>
                    {this.props.children}
                </View>
            );
        } else {
            return null;
        }
    }
}

interface IProps {
    header: string;
}

const styles = styleSheetCreate({
    header: {
        margin: 10
    } as ViewStyle
});