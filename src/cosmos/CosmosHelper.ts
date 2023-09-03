import LinkInfo from "../bean/LinkInfo";
import MenuInfo from "../bean/MenuInfo";
import ConfigLink from "../bean/ConfigLink";
import BaseDao from "./BaseDao";
import ContainerView from "../bean/ContainerView";
import ErrorInfo from "../bean/ErrorInfo";
import Log from "../tool/Log";

class CosmosHelper {

    private static readonly linkInfoMap: Map<string, LinkInfo> = new Map();

    private static readonly menuInfoMap: Map<String, MenuInfo> = new Map<String, MenuInfo>();

    public static getLinkInfo(id: string):LinkInfo {
        if (CosmosHelper.linkInfoMap.has(id)) {
            return CosmosHelper.linkInfoMap.get(id);
        } else {
            throw new ErrorInfo("Container not exist", "")
        }
    }

    public static async readMenuInfo(config: ConfigLink):Promise<MenuInfo> {

        if (!config) {
            return {id: "", name: "", databaseIds: [], containers: []};
        }

        if (CosmosHelper.menuInfoMap.has(config.id)) {
            return CosmosHelper.menuInfoMap.get(config.id);
        } else {
            return await CosmosHelper.readAll(config);
        }

    }

    public static async readAll(config: ConfigLink): Promise<MenuInfo> {

        const baseDao = new BaseDao(config.connectionString, config.id, config.name);

        const linkInfos = await baseDao.reloadAll();

        const databaseIds: string[] = []
        const containers:ContainerView[] = [];

        for (const linkInfo of linkInfos) {
            const databaseId = linkInfo.databaseInfo.id;
            const partition = linkInfo.containerInfo.partition;
            const id = linkInfo.id + "";

            const view: ContainerView = {id, databaseId, partition, name: linkInfo.containerInfo.id, linkName: linkInfo.linkName}
            containers.push(view)
            if (databaseIds.indexOf(databaseId) < 0) {
                databaseIds.push(databaseId);
            }
            CosmosHelper.linkInfoMap.set(id, linkInfo);
        }

        const menuInfo:MenuInfo = {id: config.id, name: config.name, databaseIds, containers};

        Log.info("init menuInfo::", menuInfo)

        CosmosHelper.menuInfoMap.set(config.id, menuInfo);

        return menuInfo;
    }

    public static async testLink(config: ConfigLink):Promise<number> {
        const baseDao = new BaseDao(config.connectionString, config.id);

        const linkInfos = await baseDao.reloadAll();

        return linkInfos.length;
    }

}

export default CosmosHelper