import { addDepartmentListData } from "../Type";
// 部门
const saerchData = {
    department: []
}
const departmentReducer = function (state = saerchData, action) {
    switch (action.type) {
        case addDepartmentListData: {
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