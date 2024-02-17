import { FilesMapper } from '@/modules/app/core/files-mapper' 
const ReadAllEntities =  FilesMapper.forFeature("./src/database/entities","entity")  
export const Entities = [...ReadAllEntities]