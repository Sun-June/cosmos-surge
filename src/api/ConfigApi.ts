import ApiInterface from "./ApiInterface";
import ConfigService from "../service/ConfigService";
import CosmosHelper from "../cosmos/CosmosHelper";

let apis: ApiInterface[] = []

apis.push({path: '/api/config', type: 'GET', todo: async (req, res, data) => {
    return await ConfigService.getLinkConfig();
}});

apis.push({path: '/api/config', type: 'PUT', todo: async (req, res, data) => {
    return await ConfigService.upsertLinkConfig(data);
}});

apis.push({path: '/api/config', type: 'POST', todo: async (req, res, data) => {
    return await ConfigService.addLinkConfig(data);
}});

apis.push({path: '/api/config', type: 'DELETE', todo: async (req, res, data) => {
    return await ConfigService.deleteLinkConfig(data);
}});

apis.push({path: '/api/config/test', type: 'POST', todo: async (req, res, data) => {
    return await CosmosHelper.testLink(data);
}});

export default apis