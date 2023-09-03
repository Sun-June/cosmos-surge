import log from './tool/Log'
import {createServer} from 'http'
import {URL} from 'url'
import ConfigFileHelper from "./tool/ConfigFileHelper";
import ApiInterface from "./api/ApiInterface";
import ConfigApi from "./api/ConfigApi";
import MenuInfoApi from "./api/MenuInfoApi";
import OperationApi from "./api/OperationApi";
import ConfigService from "./service/ConfigService";
import StaticApi from "./api/StaticApi";
import ResultDto from "./bean/ResultDto";
import ImportDataApi from "./api/ImportDataApi";
import {contextBridge, ipcRenderer} from "electron";

let isElectorn = false
try {
    const ipcRenderer = require('electron').ipcRenderer
    const path = ipcRenderer.sendSync('getPath')
    ConfigFileHelper.basePath = path
    console.log('the app path::', path)
    isElectorn = true
} catch (error) {
    log.info('not electron mode, node mode')
}


let apis:ApiInterface[] = []

apis = apis.concat(ConfigApi)
apis = apis.concat(MenuInfoApi)
apis = apis.concat(OperationApi)
apis = apis.concat(ImportDataApi)

const getApi: Map<string, ApiInterface> = new Map()
const deleteApi: Map<string, ApiInterface> = new Map()
const postApi: Map<string, ApiInterface> = new Map()

apis.forEach((api) => {
    if (api.type === 'POST' || api.type === 'PUT') {
        postApi.set(api.path, api)
    } else if (api.type === 'GET') {
        getApi.set(api.path, api)
    } else if (api.type === 'DELETE') {
        deleteApi.set(api.path, api)
    }
    log.info('init server: ', api.type, '  ', api.path)
})

ConfigService.getServerConfig().then(config => {
    let port = config.port

    let server = createServer(async (req, res) => {

        const requestUrl = req.url

        if (!isElectorn) {
            log.log(`(${req.method}):`, requestUrl)
        }

        if (!isElectorn && StaticApi.onRequest(requestUrl, req, res)) {
            return
        }

        const urlPaser = new URL(requestUrl, `http://localhost:${port}`)
        const url = urlPaser.pathname

        // log.log(url, `(${req.method})`)
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        let api: ApiInterface
        if (req.method === 'POST' || req.method === 'PUT') {
            api = postApi.get(url)
            let data = []
            req.on('data', chunk => {
                data.push(chunk);
            })
            req.on('end', async () => {
                let result: ResultDto
                try {
                    const jsonData = JSON.parse(data + "")
                    log.log(url, `(${req.method}):`, jsonData, api)
                    let returnData = await api.todo(req, res, jsonData)
                    result = {success: true, data: returnData}
                } catch (error) {
                    log.error(`${url}(${req.method}) has error`, error)
                    result = {success: false, error: error + ""}
                }
                res.end(JSON.stringify(result))
            })
        } else {
            if (req.method === 'GET') {
                api = getApi.get(url)
            } else if (req.method === 'DELETE') {
                api = deleteApi.get(url)
            }
            let data = {}
            urlPaser.searchParams.forEach((value, name) => {
                data[name] = value
            })

            let result: ResultDto
            try {
                if (Object.keys(data).length > 0) {
                    log.log(url, `(${req.method}):`, data)
                }
                let returnData = await api.todo(req, res, data)
                result = {success: true, data: returnData}
            } catch (error) {
                result = {success: false, error}
                log.error(`${url}(${req.method}) has error`, error)
            }

            res.end(JSON.stringify(result, (key, value) => {
                if (value instanceof Map) {
                    const map = value;
                    const obj = {}
                    map.forEach((data, field) => {
                        obj[field] = data;
                    })
                    return obj
                }
                return value
            }))
        }
    })



    server.listen(port, '0.0.0.0', () => {
        log.info('init server...', port)

        try {
            if (isElectorn) {
                const ipcRenderer = require('electron').ipcRenderer
                const contextBridge = require('electron').contextBridge
                contextBridge.exposeInMainWorld('electron', {
                    port,
                    ipcRenderer
                })
                ipcRenderer.sendSync('initTodo', port)
            }
        } catch (error) {
            log.error('electron mode has error', error)
        }
    })
}).catch(error => {
    log.error('init config is fail.', error)
})
