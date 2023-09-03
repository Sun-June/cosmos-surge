import ConfigFileHelper from "../tool/ConfigFileHelper";
import ServerConfig from "../bean/ServerConfig";
import ConfigLink from "../bean/ConfigLink";

class ConfigService {

    private static serverHelper: ConfigFileHelper

    private static linkHelper: ConfigFileHelper

    public static getServerHelper(): ConfigFileHelper {
        if (this.serverHelper) {
            return this.serverHelper
        }
        this.serverHelper = new ConfigFileHelper('server.json')
        return this.serverHelper
    }

    public static getLinkHelper(): ConfigFileHelper {
        if (this.linkHelper) {
            return this.linkHelper
        }
        this.linkHelper = new ConfigFileHelper('link.json')
        return this.linkHelper
    }

    public static async getServerConfig():Promise<ServerConfig> {
        let config = await this.getServerHelper().read<ServerConfig>({port: 0})
        if (config.port === 0) {
            config = {port: 9999}
            await this.getServerHelper().write(config)
        }
        return config
    }

    public static async getLinkConfig():Promise<ConfigLink[]> {
        return await this.getLinkHelper().read<ConfigLink[]>([]);
    }

    public static async addLinkConfig(link: ConfigLink): Promise<ConfigLink> {
        if (!link.id) {
            link.id = new Date().getTime().toString();
        }
        return await this.upsertLinkConfig(link);
    }

    public static async upsertLinkConfig(link: ConfigLink): Promise<ConfigLink> {
        if (!link.id) {
            return null;
        }
        const links = await this.getLinkConfig();
        const index = links.findIndex(l => l.id === link.id);
        if (index > -1) {
            const findLink = links[index];
            findLink.name = link.name;
            findLink.connectionString = link.connectionString;
            await this.getLinkHelper().write(links);
            return link;
        } else {
            links.push(link);
            await this.getLinkHelper().write(links);
            return link;
        }
    }

    public static async deleteLinkConfig(id: string): Promise<ConfigLink> {
        if (!id) {
            return null;
        }
        const links = await this.getLinkConfig();
        const index = links.findIndex(l => l.id === id);
        if (index > -1) {
            const link = links[index];
            links.splice(index);
            await this.getLinkHelper().write(links);
            return link;
        }
        return null;
    }

    public static async findLinkConfig(id: string): Promise<ConfigLink> {
        if (!id) {
            return null;
        }
        const links = await this.getLinkConfig();
        const index = links.findIndex(l => l.id === id);
        if (index > -1) {
            return links[index];
        }
        return null;
    }

}

export default ConfigService