import { AppDataSource } from '@/config/db.config'
import { Logger } from '@/modules/app/core/logger'
import { EntityTarget, ObjectLiteral } from 'typeorm'

export const InjectRepository = <T>(repo: EntityTarget<T extends ObjectLiteral ? T : ObjectLiteral>) => AppDataSource.getRepository(repo)
export const InitConnection = async () => {
    return AppDataSource.initialize().then(async () => {
        Logger.log("Database Connected")
    }).catch(error => {
        Logger.debug("Database Connection Error" )
        process.exit(1)
    })
}