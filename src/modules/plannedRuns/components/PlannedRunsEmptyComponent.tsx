import React, {PureComponent} from "react";
import {Text, TextStyle, View, ViewStyle} from "react-native";
import {MainButton} from "../../../common/components/MainButton";
import {localization} from "../../../common/localization/localization";
import {ButtonType} from "../../../common/enums/buttonType";
import {ImageResources} from "../../../common/ImageResources.g";
import {styleSheetCreate} from "../../../common/utils";
import {Colors, Fonts} from "../../../core/theme";

interface IProps {
    onRefreshPress: () => void;
}

export class PlannedRunsEmptyComponent extends PureComponent<IProps> {
    render(): JSX.Element {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{localization.empty.emptyPlannedRuns}</Text>
                <MainButton
                    title={localization.common.refresh}
                    buttonType={ButtonType.positive}
                    onPress={this.props.onRefreshPress}
                    icon={ImageResources.image_arow_white}
                />
            </View>
        );
    }
}

const styles = styleSheetCreate({
    container: {
        flex: 1,
        backgroundColor: Colors.whiteThree,
        alignItems: "stretch",
        justifyContent: "space-between",
    } as ViewStyle,
    title: {
        fontSize: 24,
        fontFamily: Fonts.medium,
        letterSpacing: 0.4,
        color: Colors.dark,
        padding: 24,
    } as TextStyle,
});
