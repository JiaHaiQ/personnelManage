import service from "../../src/utils/request";

/**添加部门 */
export function DepartmentAddApi(data){
    return service.request({
        url: "/department/add/",
        method: "post",
        data
    })
}
/**搜索部门 */
export function getDepartmentList(data){
    return service.request({
        url: "/department/list/",
        method: "post",
        data
    })
}
/**删除部门 */
export function deleteDepartment(data){
    console.log(data)
    return service.request({
        url: "/department/delete/",
        method: "post",
        data
    })
}