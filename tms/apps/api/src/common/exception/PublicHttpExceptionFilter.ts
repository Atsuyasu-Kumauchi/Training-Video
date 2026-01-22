import { ArgumentsHost, ExceptionFilter, HttpException, Logger } from "@nestjs/common";
import { PublicHttpException } from "./PublicHttpException";
import { BaseExceptionFilter } from "@nestjs/core";


export class PublicHttpExceptionFilter extends BaseExceptionFilter {

    private readonly logger = new Logger(PublicHttpExceptionFilter.name);

    catch(exception: any, host: ArgumentsHost) {
        if (exception instanceof PublicHttpException && exception.originalError) {
            this.logger.error(exception.originalError.message, exception.originalError.stack, exception.originalError.constructor?.name);
            exception = new HttpException(exception.publicMessage, exception.status);
        }

        super.catch(exception, host);
    }

}
