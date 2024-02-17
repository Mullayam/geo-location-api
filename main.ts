import 'reflect-metadata'
import { register } from 'tsconfig-paths'
import tsConfig from './jsconfig.json' 
register({ baseUrl: __dirname, paths: tsConfig.compilerOptions.paths })
import { AppServer } from './src/AppServer'
async function boostrap() {  
  new AppServer()
  AppServer.run()
}
boostrap()