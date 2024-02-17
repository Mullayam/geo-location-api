import Helpers from "@/utils/helpers";
import type { Request, Response, NextFunction ,Application} from "express";
import { Logger } from "./logger";

export class Modifiers {
    constructor(private readonly app: Application) {
        this.set()
    }
    set() {
        this.app.locals.title = "Air API - ENJOYS"
    }
    mount() {
        this.app.on('mount', function (parent) {
            console.log('Application Mounted')
           
          })
    }
    /**
   * Sets the X-Request-Id and X-Platform headers in the request and response objects.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @param {NextFunction} next - The next function in the middleware chain.
   */
    static IRequestHeaders(req: Request, res: Response, next: NextFunction) {
       
        const requestId = Helpers.RequestId();
        req.headers['X-Request-Id'] = requestId;
        res.setHeader('X-Request-Id', requestId);
        res.setHeader('X-RN-Platform', "ENJOYS");
        next();
    }
}