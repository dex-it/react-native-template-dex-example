import React, {PureComponent} from "react";
import {View, ViewStyle} from "react-native";
import {styleSheetCreate} from "../../common/utils";
import {ItemLayoutCache, ItemLayoutName} from "./ItemLayoutCache";
import {ItemLayoutCacheSetter} from "./ItemLayoutCacheSetter";

export class ItemLayoutCacheContainer extends PureComponent<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    render(): JSX.Element {
        return (
            <View style={styles.container}>
                <ItemLayoutCacheSetter item={ItemLayoutName.newsItem} itemLayoutCache={this.props.itemLayoutCache}>
                    <View/>
                </ItemLayoutCacheSetter>
            </View>
        );
    }
}

interface IProps {
    itemLayoutCache: ItemLayoutCache;
}

const styles = styleSheetCreate({
    container: {
        opacity: 0
    } as ViewStyle
});