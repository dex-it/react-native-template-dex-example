import _ from "lodash";
import {LoadState} from "../loadState";

export function getInitialLoadState(array: any[] | null | undefined): LoadState {
    return _.isEmpty(array) ? LoadState.needLoad : LoadState.idle;
}

export function getInitialLoadStateFromMap<T>(map: Map<T, any[]>): Map<T, LoadState> {
    return new Map<T, LoadState>(Array.from(map.entries()).map(i => [i[0], getInitialLoadState(i[1])]) as any);
}

export function getInitialLoadStateFromMap2<T>(map: Map<T, any>): Map<T, LoadState> {
    return new Map<T, LoadState>(Array.from(map.entries()).map(i => [i[0], LoadState.idle]) as any);
}