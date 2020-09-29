import { configAddStatusType } from "../Type";
// 全局参数
const config = {
    status: [
        { label: "启用", value: true },
        { label: "禁用", value: false },
    ],
}
// 全局配置 Reducer
const configReducer = function (state = config, action) {
    switch (action.type) {
        case configAddStatusType: {
            return {
                ...state,
                status: [...state.status, action.payload],
            }
        }
        default:
            return state;
    }
}

export default configReducer;