import { addDepartmentListDataType, updataDepartmentListDataType } from "../Type";

export function addDepartmentListAction(params) {
    return {
        type: addDepartmentListDataType,
        data: params.data
    }
}
export function updataDepartmentListAction(params) {
    return {
        type: updataDepartmentListDataType,
        data: params.data
    }
}
