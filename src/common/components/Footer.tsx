import React, {PureComponent} from "react";
import {ActivityIndicator, LayoutAnimation, Text, View, ViewStyle} from "react-native";
import {Colors, CommonStyles, isIphoneX} from "../../core/theme";
import {LoadState} from "../loadState";
import {styleSheetCreate} from "../utils";

interface IProps {
    loadState: LoadState;
    itemsCount: number;
}

export class Footer extends PureComponent<IProps, IEmpty> {
    componentDidUpdate(prevProps: IProps): void {
        if (this.props.loadState == LoadState.allIsLoaded && prevProps.loadState == LoadState.loadingMore) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        }
    }

    render(): JSX.Element | null {
        const {loadState, itemsCount} = this.props;

        if (loadState == LoadState.error && itemsCount > 0) {
            return (
                <View style={styles.container}>
                    <Text style={styles.errorText}>{"Loading error"}</Text>
                </View>
            );
        } else if (loadState == LoadState.error && itemsCount == 0) {
            if (isIphoneX) {
                return <View style={CommonStyles.iPhoneXFooter}/>;
            } else {
                return null;
            }
        } else if (loadState == LoadState.loadingMore) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator animating={true} size="large" color={Colors.black}/>
                </View>
            );
        } else if (loadState != LoadState.allIsLoaded) {
            return <View style={styles.container}/>;
        } else {
            return <View style={styles.empty}/>;
        }
    }
}

const styles = styleSheetCreate({
    container: {
        height: 50,
        justifyContent: "center",
        marginBottom: isIphoneX ? 10 : 0
    } as ViewStyle,
    empty: {
        height: 0
    } as ViewStyle,
    errorText: {
        textAlign: "center"
    } as ViewStyle
});
