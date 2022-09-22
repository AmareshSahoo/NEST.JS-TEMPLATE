import { ValidationError } from 'adminjs';
import { ValidationError as ValidationErrorResponse } from 'class-validator';
export default class ValidationException extends ValidationError {
    validationErrors: ValidationErrorResponse[];
    constructor(validationErrors: ValidationErrorResponse[]);
}
