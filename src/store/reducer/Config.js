import { configAddStatus } from "../Type";
// 全局参数
const config = {
    status: [
        { label: "启用", value: true},
        { label: "禁用", value: false},
    ],
}
// 默认配置 Reducer
const configReducer = function(state = config, action){
    switch(action.type){
        case configAddStatus: {
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