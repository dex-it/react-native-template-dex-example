import _ from "lodash";
import React, {Component} from "react";
import {FlatList, FlatListProperties, View, ViewStyle} from "react-native";
import {itemLayoutCache, ItemLayoutName} from "../../core/itemLayoutCache";
import {defaultIdExtractor} from "../helpers";
import {LoadState} from "../loadState";
import {LoadingView} from "./LoadingView";
import {TryAgain} from "./TryAgain";
import {Colors, CommonStyles} from "../../core/theme";
import {styleSheetCreate} from "../utils";
import {localization} from "../localization/localization";

interface IState {
    isRefreshing: boolean;
}

interface IProps extends FlatListProperties<any> {
    loadState: LoadState;
    itemLayoutName?: ItemLayoutName;
    tryAgain: () => void;
    loadMore?: () => void;
    errorText?: string;
    EmptyComponent: React.ComponentClass<any>;
    PreloadingComponent?: React.ComponentClass<any>;
}

export class FlatListWrapper extends Component<IProps, IState> {
    static defaultProps: Partial<IProps>;
    private timerId: number | null;

    constructor(props: IProps) {
        super(props);
        this.onRefresh = this.onRefresh.bind(this);

        this.state = {isRefreshing: false};
    }

    componentWillUnmount(): void {
        if (this.timerId != null) {
            clearInterval(this.timerId);
        }
    }

    render(): JSX.Element {
        let content: JSX.Element | null;

        const {loadState, itemLayoutName, data, loadMore, errorText, PreloadingComponent} = this.props;
        if (_.isEmpty(data)) {
            if (loadState == LoadState.firstLoad || loadState == LoadState.needLoad) {
                content = PreloadingComponent != null ? (<PreloadingComponent/>) : null;
            } else if (loadState == LoadState.error) {
                content = <TryAgain onPress={this.props.tryAgain} errorText={errorText}/>;
            } else {
                content = (<this.props.EmptyComponent/>);
            }
        } else {
            const getItemLayout = itemLayoutName != null
                ? itemLayoutCache.get(itemLayoutName)
                : this.props.getItemLayout;
            const props = {...this.props};
            delete props.itemLayoutName;
            delete props.loadState;
            delete props.loadMore;
            if (props.onRefresh != null) {
                props.refreshing = loadState == LoadState.pullToRefresh || this.state.isRefreshing;
                props.onRefresh = this.onRefresh;
            }
            if (loadMore != null && loadState == LoadState.idle) {
                props.onEndReachedThreshold = 1;
                props.onEndReached = loadMore;
            }

            content = (
                <FlatList
                    style={styles.list}
                    {...props}
                    getItemLayout={getItemLayout}
                />
            );
        }

        return (
            <View style={CommonStyles.flexWhiteBackground}>
                <LoadingView isLoading={loadState == LoadState.firstLoad} transparent={false}/>
                {content}
            </View>
        );
    }

    private onRefresh(): void {
        this.setState({isRefreshing: true});
        this.props.onRefresh!();
        this.timerId = _.delay((): void => this.setState({isRefreshing: false}), 500);
    }
}

FlatListWrapper.defaultProps = {
    keyExtractor: defaultIdExtractor,
    errorText: localization.errors.listErrorTitle
};

const styles = styleSheetCreate({
    list: {
        backgroundColor: Colors.whiteTwo,
    } as ViewStyle,
});