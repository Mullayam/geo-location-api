import { DataSource } from 'typeorm'
import { APP_CONFIG } from './site-config'
import { Entities } from '@/database'

export const AppDataSource = new DataSource({
    type: "postgres",
    host: String(process.env.DB_HOST) || "localhost",
    port: 5432,
    username: String(process.env.DB_USER),
    password: String(process.env.DB_PASS),
    database: String(process.env.DB_NAME),
    synchronize: APP_CONFIG.NODE_ENV === "DEVELOPMENT" ? true : false,
    logging: false,
    entities: Entities,
    subscribers: [],
    migrationsRun: APP_CONFIG.NODE_ENV === "DEVELOPMENT" ? true : false,
    migrations: [],
    migrationsTableName: "migration_table",
    ssl: false,
    extra: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})