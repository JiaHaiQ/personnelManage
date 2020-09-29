import { addDepartmentListData, updataDepartmentListData } from "../Type";

export function addDepartmentList(params) {
    return {
        type: addDepartmentListData,
        data: params.data
    }
}
export function updataDepartmentList(params) {
    return {
        type: updataDepartmentListData,
        data: params.data
    }
}
