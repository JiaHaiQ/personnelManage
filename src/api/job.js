import service from "@utils/request";

/**获取职位详情 */
export function jobDetailed(data) {
    return service.request({
        url: "/job/detailed/",
        method: "post",
        data
    })
}

/**禁启用 */
export function jobStatus(data) {
    return service.request({
        url: "/job/status/",
        method: "post",
        data
    })
}