type GetItemLayoutFunction = (data: any[] | null, index: number) => { length: number; offset: number; index: number };

export enum ItemLayoutName {
    newsItem = "myActivity"
}

export class ItemLayoutCache {
    private functions: Map<string, GetItemLayoutFunction> = new Map<string, GetItemLayoutFunction>();

    get(item: ItemLayoutName): GetItemLayoutFunction | undefined {
        return this.functions.get(item);
    }

    set(item: ItemLayoutName, layout: { x: number; y: number; width: number; height: number }): void {
        const height = layout.height;

        this.functions.set(item, (data, index) => {
            return {length: height, offset: height * index, index};
        });
    }
}