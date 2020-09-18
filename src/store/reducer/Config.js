// 全局参数
const config = {
    status: [
        { label: "启用", value: true},
        { label: "禁用", value: false},
    ],
}
// 默认配置 Reducer
const configReducer = function(state = config, action){
    return state;
}

export default configReducer;