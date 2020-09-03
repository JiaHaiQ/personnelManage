// 验证用户名
export const validata_password = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
// 验证邮箱
const reg_email = /^([a-zA-Z]|[0-9])(\w)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
export function validata_email(value){
    return reg_email.test(value)
}