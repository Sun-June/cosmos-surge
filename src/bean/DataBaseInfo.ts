import {Database} from "@azure/cosmos";

class DataBaseInfo {

    id: string

    database: Database


    constructor(id: string, database: Database) {
        this.id = id;
        this.database = database;
    }
}

export default DataBaseInfo