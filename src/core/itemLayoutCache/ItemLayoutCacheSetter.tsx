import React, {PureComponent} from "react";
import {LayoutChangeEvent, View} from "react-native";
import {ItemLayoutCache, ItemLayoutName} from "./ItemLayoutCache";

export class ItemLayoutCacheSetter extends PureComponent<IProps> {
    constructor(props: IProps) {
        super(props);

        this.onLayout = this.onLayout.bind(this);
    }

    render(): JSX.Element | null {
        const {item, itemLayoutCache} = this.props;
        if (itemLayoutCache.get(item) != null) {
            return null;
        } else {
            return (
                <View onLayout={this.onLayout}>
                    {this.props.children}
                </View>
            );
        }
    }

    private onLayout(event: LayoutChangeEvent): void {
        this.props.itemLayoutCache.set(this.props.item, {...event.nativeEvent.layout});
        this.forceUpdate();
    }
}

interface IProps {
    item: ItemLayoutName;
    itemLayoutCache: ItemLayoutCache;
}