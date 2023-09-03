import {CosmosClient} from "@azure/cosmos";

class ClientInfo {

    public id: string

    public connectionString: string

    public cosmosClient: CosmosClient

    public linkName: string = ""

    constructor(id: string, connectionString: string, cosmosClient: CosmosClient) {
        this.id = id;
        this.connectionString = connectionString;
        this.cosmosClient = cosmosClient;
    }
}

export default ClientInfo