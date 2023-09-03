import ClientInfo from "../bean/ClientInfo";
import ErrorInfo from "../bean/ErrorInfo";
import {CosmosClient} from "@azure/cosmos";
import LinkInfo from "../bean/LinkInfo";
import DataBaseInfo from "../bean/DataBaseInfo";
import ContainerInfo from "../bean/ContainerInfo";

class BaseDao {

    public clientInfo: ClientInfo

    private static readonly AccountEndpointStr:string = "AccountEndpoint="
    private static readonly AccountKeyStr:string = ";AccountKey="

    constructor(connectionString: string, id?: string, name?:string) {

        const indexFrom = connectionString.indexOf(BaseDao.AccountEndpointStr);
        const indexEnd = connectionString.indexOf(BaseDao.AccountKeyStr);

        if (indexFrom < 0 || indexEnd < 0) {
            throw new ErrorInfo("connectionString Error", "");
        }

        if (!id) {
            id = new Date().getTime().toString();
        }

        const from = indexFrom + BaseDao.AccountEndpointStr.length;
        const endpoint = connectionString.substring(from, indexEnd);

        const end = indexEnd + BaseDao.AccountKeyStr.length;
        const endKey = connectionString.endsWith(';') ? connectionString.length - 1 : connectionString.length;
        const key = connectionString.substring(end, endKey);

        const cosmosClient = new CosmosClient({endpoint, key, connectionPolicy: {requestTimeout: 30000}});

        this.clientInfo = new ClientInfo(id, connectionString, cosmosClient);
        this.clientInfo.linkName = name;
    }

    public async reloadAll(): Promise<LinkInfo[]> {
        const all = await this.clientInfo.cosmosClient.databases.readAll().fetchAll()
        const result: LinkInfo[] = [];

        for (const res of all.resources) {
            const database = this.clientInfo.cosmosClient.database(res.id);
            const databaseInfo = new DataBaseInfo(res.id, database);

            const containerDef = await database.containers.readAll().fetchAll()

            for (const con of containerDef.resources) {
                const partition = con.partitionKey.paths[0].replace('/', '')
                const container = database.container(con.id);

                const containerInfo = new ContainerInfo(con.id, partition, container);

                result.push(new LinkInfo(this.clientInfo, databaseInfo, containerInfo));
            }
        }
        return result;
    }

}

export default BaseDao