import type {IncomingMessage, ServerResponse} from "http"
import * as url from "url"

export default async (req:IncomingMessage, res:ServerResponse) => {

    const quueyObject = url.parse(req.url as string, true).query
    let data = {data: [{data: ""}]}
    const {search} = quueyObject

    if(search) {
        data = await $fetch(`https://api.tvmaze.com/search/shows?q=${search}`)
    }
    res.writeHead(200, {"Content-Type": "application/json"})
    res.write(JSON.stringify(data))
    res.end()
};