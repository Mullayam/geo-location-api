import session from 'express-session'
import { APP_CONFIG } from '@/config/site-config';
import { uuid } from '@/utils/helpers/uuid';
export class SessionHandler {

    static forRoot() {
        return session(this.prototype._sessionOptions())
    }
    private _sessionOptions(): session.SessionOptions {
        return {
            genid: function (req: any) {
                return uuid.v4() // use UUIDs for session IDs
            },
            saveUninitialized: true,
            secret: APP_CONFIG.SECRETS.COOKIE_SECRET_KEY,
            proxy: true,
            resave: false,
            cookie: {
                httpOnly: true,
                secure: false,
                maxAge: 1000 * 60 * 60 * 24 * 7
            },

        }
    }
}