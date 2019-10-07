export function ignorePromise(promise: Promise<void>, description?: string): void {
    promise.catch(reason => console.warn("IgnorePromise", description, reason));
}