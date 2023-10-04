import ApiInterface from "./ApiInterface";
import ImportDataService from "../service/ImportDataService";
import ImportTask from "../bean/ImportTask";

let apis: ApiInterface[] = []

apis.push({path: "/api/import/data", type: "POST", todo: async (req, res, data) => {
    const task = data as ImportTask
    return await ImportDataService.createAndStart(task)
}})

apis.push({path: "/api/import/data", type: "GET", todo: async (req, res, data) => {
    return ImportDataService.tasks
}})

apis.push({path: "/api/import/data/stop", type: "PUT", todo: async (req, res, data) => {
    const task = data as ImportTask
    return ImportDataService.changeStop(task.id)
}})

apis.push({path: "/api/import/data/cancel", type: "PUT", todo: async (req, res, data) => {
    const task = data as ImportTask
    return ImportDataService.cancel(task.id)
}})

export default apis