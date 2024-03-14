import c from '../constants/Constants'

/**
 * async是代表这是一个异步函数
 * 传参是一个对象
 * mkt默认值是zh-CN
 */
export async function getBingWallPapers({n=1,mkt='zh-CN'}:{n?:number,mkt?:string}){
    // 请求参数后缀
    const paramStrSuffix = `format=js&idx=${n-1}&n=${n}&mkt=${mkt}`
    return await fetch(c.BING_WALL_PAPER_API+paramStrSuffix)
        .then(res=>res.json())
        .then(json=> {return json.images})
        .catch(e=> console.log(e))
}