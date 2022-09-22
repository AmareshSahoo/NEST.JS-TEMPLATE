"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetchError = (errors) => {
    const [error] = errors;
    const [message] = Object.values(error.constraints);
    return {
        field: error.property,
        message,
    };
};
//# sourceMappingURL=admim-validation.exception.js.map