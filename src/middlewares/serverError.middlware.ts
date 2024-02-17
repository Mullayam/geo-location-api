import { Injectable } from "src/modules/common";
import { Request, Response, NextFunction } from "express";
import { ErrorMiddleware } from 'src/modules/app'
import { ExceptionHandler } from '@enjoys/exception';
@Injectable()
export class ServerErrorHandler implements ErrorMiddleware { 
  use(error: Error, _request: Request, response: Response, next: NextFunction) {    
    if (error)  {     
       return  ExceptionHandler(error, _request, response, next);
    }
    next()
  }
}
