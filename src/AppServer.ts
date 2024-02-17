import * as http from 'http'
import express, { Application, NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { blue, red } from 'colorette';
import { Cors } from '@/modules/app/core/cors';
import { Container, attachControllers, ERROR_MIDDLEWARE } from 'src/modules/app';
import { Controllers } from 'src/contollers';
import { getInjectables } from './modules/common/decorators/injectable';
import morgan from 'morgan';
import { APP_CONFIG } from './config/site-config';
import { FilesMapper } from './modules/app/core/files-mapper';
import { Interceptor } from './modules/app/core/interceptors';
import { Logger } from './modules/app/core/logger';
import helmet from 'helmet';
import cookieParser from 'cookie-parser'
import { SessionHandler } from '@/modules/app/core/session';
import {InitConnection} from '@/database/init-connection'
import { Modifiers } from './modules/app/core/modifiers';
const app: Application = express()

export class AppServer {

    private static PORT: number = APP_CONFIG.PORT;


    constructor() {
        Logger.alert("Applying Server Configurations");
        this.ApplyConfiguration()       
        this.InitMiddlewares()
        this.LoadInterceptors();
        this.InitializeControllers()       
        this.GracefulShutdown()
    }
    /**
     * Applies the necessary configurations to the AppServer.
     *
     * No parameters.
     * 
     * @return {void} This function does not return anything.
     */
    private ApplyConfiguration() {
        app.set('trust proxy', 1)
        app.use(helmet());
        app.use(morgan("dev"));
        app.use(cookieParser(APP_CONFIG.SECRETS.COOKIE_SECRET_KEY));
        app.use(Cors.useCors());
        app.use(bodyParser.json());
        app.use(SessionHandler.forRoot());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(Modifiers.IRequestHeaders)
    }
    /**
     * Initializes the controllers by registering dependencies and attaching them to the app.
     *
     * @return {Promise<void>} A promise that resolves once the controllers are initialized.
     */
    private async InitializeControllers() {      
        this.RegisterDependencies()
        await attachControllers(app, Controllers);
    }
    /**
    * Load the interceptors for the app server.
    *
    * @param {type} paramName - description of parameter
    * @return {type} description of return value
    */
    private LoadInterceptors() {
        Interceptor.useInterceptors(app, {
            response: { PowredBy: "AIRAPI - ENJOYS" }, // enter your custom interceptor in object format
            isEnable: false, // default is false
        });
    }
    private InitMiddlewares() {
        
    }
    private RegisterDependencies() {
        //  DO NOT EDIT THIS CONFIG UNTILL YOU KNOW WHAT IS THIS DOING
        const injectables = getInjectables()
       
        const t = [...injectables].map((Injectable: any) => {
            if (((Injectable.name).toLowerCase()).endsWith("errorhandler") || ((Injectable.name).toLowerCase()).endsWith("errorhandlers")) {
                return {
                    provide: ERROR_MIDDLEWARE,
                    useClass: Injectable
                }
            }
            return {
                provide: Injectable,
                useClass: Injectable
            }
        })

        Container.provide(t);            
        FilesMapper.Mapper(app)
    }
    private static async start() {        
        try {
             
            // await InitConnection()  // uncoment this when use of database
            const server = http.createServer(app).listen(AppServer.PORT, () => {               
                console.log(process.pid, blue(`Standalone Express Server listening on port http://localhost:${AppServer.PORT}`),)
            })
            server.on('close', () => {
                this.prototype.CloseServer(server)
            })
        } catch (error: any) {
            console.log(red(error))
        }
        
    }
    static async run() {
        Logger.alert("InitailizeApplication")       
        AppServer.start().catch((e)=> Logger.debug(e));
    }
    /**
    * Gracefully shuts down the application.
    *
    * @private
    */
    private GracefulShutdown() {
        process.on('SIGINT', () => {
            process.exit(1);
        })
        process.on('SIGTERM', () => {
            process.exit(1);
        })       

    }
    /**
     * Closes the given server and exits the process.
     *
     * @param {http.Server} server - The server to be closed.
     */
    private CloseServer(server: http.Server) {
        server.close(() => {
            process.exit(1);
        });
    }
}
