import { FilesMapper } from '@/modules/app/core/files-mapper'
export * from './serverError.middlware'
const middleware =  FilesMapper.forFeature("./src/middlewares","middleware")  
export const Middlewares = [...middleware]  