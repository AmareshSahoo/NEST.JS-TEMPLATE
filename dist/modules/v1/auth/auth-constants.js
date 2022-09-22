"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authConstants = {
    jwt: {
        secret: 'SECRET',
        expirationTime: {
            accessToken: '1d',
            refreshToken: '7d',
        },
    },
    mailer: {
        verifyEmail: {
            subject: 'Email Verification',
            template: 'verify-password',
        },
    },
    redis: {
        expirationTime: {
            jwt: {
                accessToken: 86400,
                refreshToken: 604800,
            },
        },
    },
};
exports.default = authConstants;
//# sourceMappingURL=auth-constants.js.map