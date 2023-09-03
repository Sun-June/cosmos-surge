import {statSync, readFile, writeFile, access, mkdirSync} from 'fs'
import Log from './Log'
import * as path from "path";

class ConfigFileHelper {

    public static basePath: string = '.'

    public file: string

    public filePath: string

    constructor(file: string) {
        const sep = path.sep
        this.file = file
        this.filePath = ConfigFileHelper.basePath + `${sep}config${sep}` + file;
        try {
            statSync(ConfigFileHelper.basePath + `${sep}config`)
        } catch (error) {
            Log.info('config dir not exist, mkdir config')
            mkdirSync(ConfigFileHelper.basePath + `${sep}config`)
        }
        Log.log(`the config file path: ${this.filePath}`)
    }

    async read<T>(defaultValue:T): Promise<T> {
        return new Promise((resolve,reject)=> {
            readFile(this.filePath, 'utf8', (err, data) => {
                if (err) {
                    Log.info(`read ${this.filePath} has error`, err, data)
                    resolve(defaultValue)
                } else {
                    let jsonData = JSON.parse(data) as T;
                    resolve(jsonData);
                }
            });
        })
    }

    async write(content: any): Promise<string> {
        return new Promise((resolve,reject)=> {
            let contentStr = ''
            if (typeof(content) != 'string') {
                contentStr = JSON.stringify(content);
            }
            access(this.filePath, error => {
                writeFile(this.filePath, contentStr, (err) => {
                    if (err) throw err;
                    resolve(contentStr);
                })
            })
        })
    }

}

export default ConfigFileHelper