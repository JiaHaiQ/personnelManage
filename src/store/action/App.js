import { setTokenType, setUsernameType } from "../Type";
// cookies
import { setToken, setUsername } from "@utils/cookies";
export function setTokenAction(data) {
    setToken(data);
    return {
        type: setTokenType,
        value: data
    }
}
export function setUsernameAction(data) {
    setUsername(data);
    return {
        type: setUsernameType,
        value: data
    }
}