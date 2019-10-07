// noinspection JSUnusedGlobalSymbols | public api
export function delayPromise<T>(millis: number, value?: T): Promise<T> {
    return new Promise((resolve): void => {
        setTimeout(() => {
            resolve(value);
        }, millis);
    });
}
