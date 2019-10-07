import React, {PureComponent} from "react";
import {Linking, Text, TextProperties} from "react-native";

interface IProps extends TextProperties {
    url: string;
}

export class TextLink extends PureComponent<IProps> {
    constructor(props: IProps) {
        super(props);

        this.onPress = this.onPress.bind(this);
    }

    render(): JSX.Element {
        return (
            <Text {...this.props} onPress={this.onPress}>
                {this.props.url}
            </Text>
        );
    }

    private async onPress(): Promise<void> {
        await Linking.openURL(this.props.url);
    }
}
