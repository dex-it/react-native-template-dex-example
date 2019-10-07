export function formatInches(inches: number): string {
    const feets = Math.trunc(inches / 12);

    return `${feets}'${inches - feets * 12}''`;
}