import React, {Component} from "react";
import {Text, View} from "react-native";
import {INavigationState} from "../../core/store";
import {INavigationConfig} from "./reduxHelper";

export class NavigationConfig {
    static instance: INavigationConfig<INavigationState> = {
        getNavigationComponent: (): any => Stub, // only for first getScreen call
        getReducer: (): any => {
            throw new Error("We should not be here");
        },
        getCombinedInitialState: (): any => {
            throw new Error("We should not be here");
        },
        reduxStack: {}
    };
}

export class Stub extends Component {
    render(): JSX.Element {
        return (
            <View>
                <Text>Content</Text>
            </View>
        );
    }
}