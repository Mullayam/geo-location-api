import { Application } from "express"
import { HttpException } from "@enjoys/exception";
import { rateLimit, Options, RateLimitRequestHandler } from 'express-rate-limit'
import { Logger } from "./logger";
export type RateLimitInfo = {
    limit: number
    current: number
    remaining: number
    resetTime: Date | undefined
}
function ThrottleException(message: Record<string, any> = { path: "/", info: "Request Throttled", solution: "Try Again after time you settled in the rate limit, or disable it" }): void {
    new HttpException({ name: "TOO_MANY_REQUESTS", message: "Current Rate Limit is Exceeded", stack: message })
}
const LIMITER_HANDLER = () => ThrottleException()
export class Throttler{
    private static instance: Throttler
    private static AllLimiters: string[] = [];   
    constructor(private app: Application) { }
    /**
     * Create a new instance of the Limiter class.
     *
     * @param {Application} app - The application object.
     * @return {Limiter} - The new instance of the Limiter class.
     */
    static createInstance(app: Application): Throttler {
        if (!(this instanceof Throttler)) {
            Throttler.instance = new Throttler(app);
        }
        return Throttler.instance
    }
    /**
     * Retrieves the list of active limiters.
     *
     * @return {string[]} The list of active limiters.
     */
    static getActiveLimiters(): string[] {
        return this.AllLimiters
    }
    /**
     * Enabled the use of RateLimiter in Api Calls
     *
     * @param {number | "noLimit"} limit - The limit parameter that specifies the maximum number of something or "noLimit" to indicate no limit.
     * @param {number} timeout - The timeout parameter that specifies the duration in milliseconds.
     */
    static useLimiter(limit: number | "noLimit", timeout: number = 0) {
        if (limit === "noLimit") return;
        if (timeout === 0) timeout = 1;
        Logger.alert("Rate Limiting is Enabled")
        Throttler.AllLimiters.push("Default Limiter")
        const limiter = rateLimit({
            windowMs: timeout * 60 * 1000, // 15 minutes
            max: limit, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
            standardHeaders: 'draft-7', // draft-6: RateLimit-* headers; draft-7: combined RateLimit header
            legacyHeaders: false, // X-RateLimit-* headers
            handler: LIMITER_HANDLER
            // store: ... , // Use an external store for more precise rate limiting
        })
        Throttler.instance.app.use(limiter)
    }

      /**
     * Creates a new RateLimitRequestHandler.
     *
     * @param {string} LimiterName - The name of the limiter.
     * @param {Omit<Partial<Options>, "handler">} LimiterOptions - The options for the limiter.
     * @return {RateLimitRequestHandler} The newly created RateLimitRequestHandler.
     */
    static forRoute(LimiterName: string, LimiterOptions: Omit<Partial<Options>, "handler">): RateLimitRequestHandler {
        Throttler.AllLimiters.push(LimiterName)
        Logger.alert("Rate Limiting is Enabled, Name " + LimiterName)

        return rateLimit({ ...LimiterOptions,  message: "You have exceeded your 5 requests per minute limit.", handler: LIMITER_HANDLER })
    }
}