import {IncomingMessage, ServerResponse} from "http";
import {stat as fsStat, readFile} from 'fs'
import {extname} from 'path'

const MIME_TYPE = {
    "css": "text/css",
    "gif": "image/gif",
    "html": "text/html",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "js": "text/javascript",
    "json": "application/json",
    "pdf": "application/pdf",
    "png": "image/png",
    "svg": "image/svg+xml",
    "swf": "application/x-shockwave-flash",
    "tiff": "image/tiff",
    "txt": "text/plain",
    "wav": "audio/x-wav",
    "wma": "audio/x-ms-wma",
    "wmv": "video/x-ms-wmv",
    "xml": "text/xml"
}

class StaticApi {
    public static readonly staticPath:string = '/static'

    public static onRequest(filePath:string, request:IncomingMessage, response: ServerResponse):boolean {
        if (filePath === '' || filePath === '/') {
            filePath = '/index.html'
        }
        let ext = extname(filePath);
        if (ext.length < 2) {
            return false
        }
        filePath = this.staticPath + filePath

        filePath = `.${filePath}`
        request.setEncoding("utf8")
        fsStat(filePath,(err, stat) => {
            if (err) {
                response.writeHead(404,{'content-type':'text/plain' });
                response.write('The Resourse ' + filePath + ' was Not Found!');
                response.end();
            } else {
                ext = ext ? ext.slice(1) : 'unknown';
                const contentType = MIME_TYPE[ext] || "text/html";
                readFile(filePath,"binary",function(err,data){
                    if (err) {
                        response.end("<h1>500</h1>Resource does not exist!");
                    } else {
                        response.writeHead(200,{'content-type':contentType});
                        response.end(data.toString(),"binary");
                    }
                });
            }
        });
        return true
    }

}

export default StaticApi