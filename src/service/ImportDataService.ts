import ImportTask from "../bean/ImportTask";
import OperationDao from "../cosmos/OperationDao";
import CosmosHelper from "../cosmos/CosmosHelper";
import LinkInfo from "../bean/LinkInfo";
import Log from "../tool/Log";

class ImportDataService {

    public static readonly tasks: ImportTask[] = []
    
    public static async createAndStart(task: ImportTask): Promise<ImportTask> {
        task.id = new Date().getTime().toString();
        task.status = "init";
        this.tasks.push(task);
        this.runTask(task);
        return task;
    }
    
    private static async runTask(task: ImportTask): Promise<ImportTask> {
        try {
            const fromLink = CosmosHelper.getLinkInfo(task.fromId)
            const toLink = CosmosHelper.getLinkInfo(task.toId)
            const fromPartition = fromLink.containerInfo.partition;
            const toPartition = toLink.containerInfo.partition;

            let page = 1;
            const pageSize = 10;
            let datas: any[] = []
            task.status = "run";
            do {
                task.total = await this.countTask(task);
                datas = await this.pageTodo(task, page, pageSize);
                for (const data of datas) {
                    try {
                        const partitionName = data[fromPartition] as string
                        if (await this.existData(toLink, data["id"], partitionName)) {
                            if (task.type === "upsert") {
                                delete data[fromPartition]
                                data[toPartition] = partitionName;
                                await OperationDao.update(task.toId, data)
                            } else {
                                task.skip++
                            }
                        } else {
                            delete data[fromPartition]
                            data[toPartition] = partitionName;
                            await OperationDao.create(task.toId, data)
                        }
                    } catch (e) {
                        Log.error("task operation data has error", e)
                        task.error++;
                    }
                    task.process++;
                }
                page++;

            } while (datas.length >= pageSize)

        } catch (e) {
            task.message = "error to final: " + e
        }
        task.status = "end";
        task.end = new Date()

        this.deleteDelay(task);

        return task;
    }

    private static deleteDelay(task: ImportTask) {
        setTimeout(() => {
            const index = this.tasks.indexOf(task);
            if (index !== -1) {
                this.tasks.splice(index, 1);
                Log.log(`clear ${task.name}`)
            } else {
                Log.error(`${task.name} not exist, clear fail`)
            }
        }, 600000);
    }

    private static async pageTodo(task: ImportTask, page: number, pageSize: number): Promise<any[]> {
        const offset = pageSize * (page - 1)
        const sql = task.sql.split("order by")[0] + ` order by c._ts ASC OFFSET ${offset} LIMIT ${pageSize}`
        return await OperationDao.query(task.fromId, sql)
    }

    private static async existData(link: LinkInfo, id: string, partition: string): Promise<boolean> {
        const sql = `select COUNT(1) as num from c where c.id = "${id}" and c["${link.containerInfo.partition}"] = "${partition}"`
        const datas = await OperationDao.query(link.id, sql)
        if (datas && datas.length > 0 && typeof datas[0].num === "number") {
            return datas[0].num > 0
        }
        return false
    }

    private static async countTask(task: ImportTask): Promise<number> {
        const splits = task.sql.split('where')
        let countSql = 'select COUNT(1) as num from c '
        if (splits.length == 2) {
            countSql = 'select COUNT(1) as num from c where ' + task.sql.split('where')[1]
        }
        const datas = await OperationDao.query(task.fromId, countSql)
        if (datas && datas.length > 0 && typeof datas[0].num === "number") {
            return datas[0].num
        }
        return 0;
    }
    
}

export default ImportDataService