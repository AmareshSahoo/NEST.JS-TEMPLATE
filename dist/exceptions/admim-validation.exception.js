"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adminjs_1 = require("adminjs");
const fetchError = (errors) => {
    const [error] = errors;
    const [message] = Object.values(error.constraints);
    return {
        field: error.property,
        message,
    };
};
class ValidationException extends adminjs_1.ValidationError {
    constructor(validationErrors) {
        const { field, message } = fetchError(validationErrors);
        super({
            [field]: {
                message,
            },
        }, {
            message,
        });
        this.validationErrors = validationErrors;
    }
}
exports.default = ValidationException;
//# sourceMappingURL=admim-validation.exception.js.map