import ApiInterface from "./ApiInterface";
import ConfigService from "../service/ConfigService";
import CosmosHelper from "../cosmos/CosmosHelper";

let apis: ApiInterface[] = []

apis.push({path: '/api/menu', type: 'GET', todo: async (req, res, data) => {
    const id = data["id"];
    const config = await ConfigService.findLinkConfig(id);
    return await CosmosHelper.readMenuInfo(config);
}});

export default apis