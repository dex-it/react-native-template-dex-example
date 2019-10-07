import React, {PureComponent} from "react";
import {View} from "react-native";
import {CommonStyles, isIphoneX} from "../../core/theme";

export class IPhoneXFooter extends PureComponent<IEmpty> {
    constructor(props: IEmpty) {
        super(props);
    }

    render(): JSX.Element | null {
        if (isIphoneX) {
            return <View style={CommonStyles.iPhoneXFooter}/>;
        } else {
            return null;
        }
    }
}