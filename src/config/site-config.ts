export const APP_CONFIG = {
    PORT: Number(process.env.PORT) || 7134,
    NODE_ENV: String(process.env.NODE_ENV),
    APP_URL: String(process.env.APP_URL),

    ALLOWED_PRIMARY_DOMAIN: String(process.env.ALLOWED_PRIMARY_DOMAIN),
    MAIL_TEMPLATE_PATH: String(process.env.MAIL_TEMPLATE_PATH),

    SECRETS: {
        SALT: String(process.env.SALT),
        JWT_SECRET_KEY: String(process.env.JWT_SECRET_KEY),
        COOKIE_SECRET_KEY: String(process.env.COOKIE_SECRET_KEY),
    },
    DATABASE: {
        DBHOST: String(process.env.DBHOST),
        DBNAME: String(process.env.DBNAME),
        DBUSER: String(process.env.DBUSER),
        DBPASS: String(process.env.DBPASS),
        DBPORT: Number(process.env.SMTP_HOST_PORT) || 5432,
    },
    MAIL_SETTINGS: {
        SMTP_HOST: String(process.env.SMTP_HOST),
        SMTP_HOST_USER: String(process.env.SMTP_HOST_USER),
        SMTP_HOST_PASS: String(process.env.SMTP_HOST_PASS),
        SMTP_HOST_PORT: Number(process.env.SMTP_HOST_PORT) || 465,
        SMTP_TYPE: String(process.env.SMTP_TYPE),
    },
    CACHE: {
        CACHE_HOST: String(process.env.CACHE_HOST),
        CACHE_PORT: Number(process.env.PORT) || 6379,
    },
    PROVIDERS: {
        GOOGLE: {
            GOOGLE_CLIENT_ID: String(process.env.GOOGLE_CLIENT_ID),
            GOOGLE_CLIENT_SECRET: String(process.env.GOOGLE_CLIENT_SECRET),
            GOOGLE_CALLBACK_URL: String(process.env.GOOGLE_CALLBACK_URL),
        }
    }

}