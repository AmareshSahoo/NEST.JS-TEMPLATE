declare const authConstants: {
    jwt: {
        secret: string;
        expirationTime: {
            accessToken: string;
            refreshToken: string;
        };
    };
    mailer: {
        verifyEmail: {
            subject: string;
            template: string;
        };
    };
    redis: {
        expirationTime: {
            jwt: {
                accessToken: number;
                refreshToken: number;
            };
        };
    };
};
export default authConstants;
