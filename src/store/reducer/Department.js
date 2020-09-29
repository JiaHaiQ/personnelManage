import { addDepartmentListDataType } from "../Type";
// 部门
const saerchData = {
    department: []
}
const departmentReducer = function (state = saerchData, action) {
    switch (action.type) {
        case addDepartmentListDataType: {
            return {
                ...state,
                departmentList: action.data
            }
        }
        default:
            return state;
    }
}

export default departmentReducer;