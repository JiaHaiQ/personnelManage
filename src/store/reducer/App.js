import { setTokenType, setUsernameType } from "../Type";
import { getToken, getUsername } from "@utils/cookies";
// 全局参数
const app = {
    token: "" || getToken(),
    username: "" || getUsername()
}
// app Reducer
const appReducer = function (state = app, action) {
    switch (action.type) {
        // token
        case setTokenType: {
            return {
                ...state,
                token: action.value,
            }
        }
        // username
        case setUsernameType: {
            return {
                ...state,
                username: action.value,
            }
        }
        default:
            return state;
    }
}

export default appReducer;