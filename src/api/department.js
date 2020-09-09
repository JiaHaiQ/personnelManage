import service from "../../src/utils/request";

/**添加部门 */
export function DepartmentAddApi(data){
    return service.request({
        url: "/department/add/",
        method: "post",
        data
    })
}