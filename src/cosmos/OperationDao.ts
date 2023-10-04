import Log from "../tool/Log";
import CosmosHelper from "./CosmosHelper";
import {BulkOperationType, UpsertOperationInput} from "@azure/cosmos";

class OperationDao {

    public static async query(containerId: string, querySpec: string) {
        const container = CosmosHelper.getLinkInfo(containerId).containerInfo.container;

        try{
            Log.log(`${containerId} query: `, querySpec)
            const { resources: items } = await container.items.query(querySpec).fetchAll();
            return items
        } catch (error) {
            throw error
        }
    }


    public static async create(containerId: string, item) {
        const info = CosmosHelper.getLinkInfo(containerId).containerInfo;
        const container = info.container;

        try {
            Log.log(`${info.id} create: `, item)
            const { resource: createdItem } = await container.items.create(item);
            return createdItem;
        } catch (error) {
            throw error;
        }
    }

    public static async update(containerId: string, item) {
        const info = CosmosHelper.getLinkInfo(containerId).containerInfo;
        const container = info.container;
        try {
            Log.log(`${containerId} update: `, item)
            const { resource: updateItem } = await container.item(item.id, item[info.partition]).replace(item);
            return updateItem;
        } catch (error) {
            throw error;
        }
    }

    public static async delete(containerId: string, item) {
        const info = CosmosHelper.getLinkInfo(containerId).containerInfo;
        const container = info.container;

        try {
            Log.log(`${containerId} delete: `, item)
            const { resource: result } = await container.item(item.id, item[info.partition]).delete();
            return result;
        } catch (error) {
            throw error;
        }
    }

    // Problems, temporarily unavailable
    public static async batchUpsert(containerId: string, items) {
        const info = CosmosHelper.getLinkInfo(containerId).containerInfo;
        const container = info.container;

        try {
            const inputs = new Array<UpsertOperationInput>();
            const arr = []
            let partitionKey = "";
            for (const item of items) {
                inputs.push({operationType: BulkOperationType.Upsert, resourceBody: item, partitionKey: item[info.partition]})
                partitionKey = item[info.partition]
            }
            Log.log(`${containerId} batch upsert inputs[${partitionKey}]: `, inputs)
            const {result: responses} = await container.items.batch(inputs, partitionKey);
            Log.log(`${containerId} batch upsert result: `, responses)

            for (const response of responses) {
                arr.push(response.resourceBody)
            }
            return arr;
        } catch (error) {
            throw error;
        }
    }

}

export default OperationDao