import {Container} from "@azure/cosmos";

class ContainerInfo {

    id: string

    partition: string

    container: Container


    constructor(id: string, partition: string, container: Container) {
        this.id = id;
        this.partition = partition;
        this.container = container;
    }
}

export default ContainerInfo
