import { HttpStatus } from "@nestjs/common";
import { PublicHttpException } from "./PublicHttpException";

export function throwSe<T>(t: new () => T): never {
    throw new t();
}

export function throwHttpException(message: string, statusCode: HttpStatus, originalException: any): never {
    throw new PublicHttpException(statusCode, message, originalException);
}
