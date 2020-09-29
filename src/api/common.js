import service from "@utils/request";

/**
 * 公共获取列表方法 
 */
export function TableList(params) {
    return service.request({
        url: params.url,
        method: params.method || "post",
        data: params.data
    })
}

/**
 * 公共删除列表列表数据方法
 */
export function TableDelete(params) {
    return service.request({
        url: params.url,
        method: params.method || "post",
        data: params.data
    })
}

/**
 * 公用API 
 */
export function requestData(params) {
    return service.request({
        url: params.url,
        method: params.method || "post",
        data: params.data
    })
}