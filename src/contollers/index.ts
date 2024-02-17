import { FilesMapper } from '@/modules/app/core/files-mapper' 
const controllers =  FilesMapper.forFeature("./src/contollers","controller")  
export const Controllers = [...controllers]  