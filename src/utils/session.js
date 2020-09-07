const tokenAdimn = 'adminToken';

export function setToken(value){
    sessionStorage.setItem(tokenAdimn, value)
}

export function getToken(){
    return sessionStorage.getItem(tokenAdimn)
}