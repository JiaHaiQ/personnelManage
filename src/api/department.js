import service from "@utils/request";

/**添加部门 */
export function DepartmentAddApi(data) {
    return service.request({
        url: "/department/add/",
        method: "post",
        data
    })
}
/**搜索部门 */
export function getDepartmentList(data) {
    return service.request({
        url: "/department/list/",
        method: "post",
        data
    })
}
/**删除部门 */
export function deleteDepartment(data) {
    return service.request({
        url: "/department/delete/",
        method: "post",
        data
    })
}
/**修改部门 */
export function editDepartment(data) {
    return service.request({
        url: "/department/edit/",
        method: "post",
        data
    })
}
/**禁启用 */
export function departmentStatus(data) {
    return service.request({
        url: "/department/status/",
        method: "post",
        data
    })
}
/**获取部门详情 */
export function departmentDetailed(data) {
    return service.request({
        url: "/department/detailed/",
        method: "post",
        data
    })
}