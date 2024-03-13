import c from '../constants/Constants'

/**
 * async是代表这是一个异步函数
 */
export async function getBingWallPapers(){
    return await fetch(c.BING_WALL_PAPER_API)
        .then(res=>res.json())
        .then(json=> {return json.images})
        .catch(e=> console.log(e))
}