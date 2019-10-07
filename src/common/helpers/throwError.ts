export function throwError(errOrMes: string | Error): void {
    throw (typeof errOrMes == "string") ? new Error(errOrMes) : errOrMes;
}