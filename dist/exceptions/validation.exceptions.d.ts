import { BadRequestException, ValidationError } from '@nestjs/common';
export default class ValidationExceptions extends BadRequestException {
    validationErrors: ValidationError[];
    constructor(validationErrors: ValidationError[]);
}
