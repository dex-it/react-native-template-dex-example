export function defaultIdExtractor(item: { id: any }): string {
    if (typeof item.id == "string") {
        return item.id;
    } else {
        return item.id.toString();
    }
}