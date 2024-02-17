import * as fs from 'fs'
import path from "path"
import { Type } from '../types'
import listEndpoints from 'list_end_points'
import { Application } from 'express'

type T = "controller" | "entity" | "service"| "middleware"
export class FilesMapper {
    static forFeature(pathName: string, basename: T):Type[] {
        const __workingDir = path.join(process.cwd(), pathName)
        return fs.readdirSync(__workingDir)
            .filter((file) => file.startsWith('index') === false)
            .filter((file) => (path.extname(file) === '.js') || (file !== '.ts') && !file.endsWith('.d.ts'))
            .filter((file) => file.indexOf(".spec") === -1 && file.indexOf(".test") === -1)
            .map((file) => require(`${__workingDir}\\${file}`).default as any)
    }
    static Mapper(AppServer: Application) {
        return listEndpoints(AppServer)        
    }
}