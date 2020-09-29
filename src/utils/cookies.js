import cookies from 'react-cookies';
const tokenAdimn = 'adminToken';
const user = 'username';
// 存token
export function setToken(value) {
    cookies.save(tokenAdimn, value)
}
// 存username
export function setUsername(value) {
    cookies.save(user, value)
}
// 获取Token
export function getToken() {
    return cookies.load(tokenAdimn)
}
// 获取Username
export function getUsername() {
    return cookies.load(user)
}