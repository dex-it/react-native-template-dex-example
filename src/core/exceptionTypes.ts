export enum ExceptionType {
    Connection = "ConnectionError",
    NoAuth = "NoAuthError",
    UserNotFound = "UserNotFoundException",
    EmailInUse = "EmailAlreadyExistsException",
    InvalidCode = "InvalidCodeException",
    DateTooSmall = "DateTooSmallException"
}

export function isErrorOfType(error: Error, type: ExceptionType): boolean {
    return error.name == type as any || (error as any).type == type;
}

export class NoAuthError implements Error {
    name = ExceptionType.NoAuth;
    message: string;

    constructor(message: string) {
        this.message = message;
    }
}