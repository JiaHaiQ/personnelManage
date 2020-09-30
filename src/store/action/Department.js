import { addDepartmentListDataType, updateDepartmentListDataType } from "../Type";

export function addDepartmentListAction(params) {
    return {
        type: addDepartmentListDataType,
        data: params.data
    }
}
export function updateDepartmentListAction(params) {
    return {
        type: updateDepartmentListDataType,
        data: params.data
    }
}
