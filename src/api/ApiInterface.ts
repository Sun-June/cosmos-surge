import {IncomingMessage, ServerResponse} from 'http'

interface ApiInterface {
    path: string

    type: string

    todo(req:IncomingMessage, res: ServerResponse, data: any): Promise<Object>
}

export default ApiInterface