import ClientInfo from "./ClientInfo";
import DataBaseInfo from "./DataBaseInfo";
import ContainerInfo from "./ContainerInfo";

class LinkInfo {

    public id: string

    public linkName: string = ""

    public clientInfo: ClientInfo

    public databaseInfo: DataBaseInfo

    public containerInfo: ContainerInfo

    constructor(clientInfo: ClientInfo, databaseInfo: DataBaseInfo, containerInfo: ContainerInfo) {
        this.id = clientInfo.id + "_" + databaseInfo.id + "_" + containerInfo.id;
        this.linkName = clientInfo.linkName;
        this.clientInfo = clientInfo;
        this.databaseInfo = databaseInfo;
        this.containerInfo = containerInfo;
    }
}

export default LinkInfo