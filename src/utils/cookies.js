import cookies from 'react-cookies';
const tokenAdimn = 'adminToken';
const user = 'username';
// 存token
export function setToken(value){
    cookies.save(tokenAdimn, value)
}
// 存username
export function setUsername(value){
    cookies.save(user, value)
}
// getToken
export function getToken(){
    return cookies.load(tokenAdimn)
}
// getUsername
export function getUsername(){
    return cookies.load(user)
}