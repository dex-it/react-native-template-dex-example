export class Ref<T> {
    private animated: boolean;

    constructor(config?: { animated: boolean }) {
        this.animated = config != null && config.animated;
        this.handler = this.handler.bind(this);
    }

    private _ref: T;
    get ref(): T {
        if (this.animated) {
            return (this._ref as any).getNode();
        } else {
            return this._ref;
        }
    }

    get hasRef(): boolean {
        return this._ref != null;
    }

    handler(ref: any): void {
        this._ref = ref;
    }
}
