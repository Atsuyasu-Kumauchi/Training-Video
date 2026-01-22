import { HttpStatus } from "@nestjs/common";
import { PublicHttpException } from "./PublicHttpException";

export function throwSe<T>(t: new (...args: any[]) => T, ...args: any[]): never {
    throw new t(...args);
}

export function throwHttpException(message: string, statusCode: HttpStatus, originalException: any): never {
    throw new PublicHttpException(statusCode, message, originalException);
}
