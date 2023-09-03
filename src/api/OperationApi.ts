import ApiInterface from "./ApiInterface";
import Log from "../tool/Log";
import CosmosOperation from "../bean/CosmosOperation";
import OperationDao from "../cosmos/OperationDao";

let apis: ApiInterface[] = []

apis.push({path: '/api/cosmos/operation', type: 'POST', todo: async (req, res, data) => {
    Log.log('operation.data::', data)
    let operation = data as CosmosOperation;
    if (operation.type === 'query') {
        return await OperationDao.query(operation.linkId, operation.query)
    } else {
        let items = operation.items
        let result = []
        if (operation.type === "create") {
            for (let item of items) {
                let newItem = await OperationDao.create(operation.linkId, item)
                result.push(newItem)
            }
        } else if (operation.type === "update") {
            for (let item of items) {
                let newItem = await OperationDao.update(operation.linkId, item)
                result.push(newItem)
            }
        } else if (operation.type === "delete") {
            for (let item of items) {
                let newItem = await OperationDao.delete(operation.linkId, item)
                result.push(newItem)
            }
        }
        return result
    }
}})

export default apis