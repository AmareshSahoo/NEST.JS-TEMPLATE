"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
function transform(errors) {
    return errors.map((error) => (error.constraints ? Object.values(error.constraints) : []));
}
class ValidationExceptions extends common_1.BadRequestException {
    constructor(validationErrors) {
        super({ error: 'ValidationError', messages: transform(validationErrors).flat() });
        this.validationErrors = validationErrors;
    }
}
exports.default = ValidationExceptions;
//# sourceMappingURL=validation.exceptions.js.map