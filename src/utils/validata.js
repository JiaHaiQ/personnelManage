// 验证密码
export const reg_password = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
export const validata_password = reg_password;
export function validata_pass(value) {
    return reg_password.test(value)
}
// 验证邮箱
export const reg_email = /^([a-zA-Z]|[0-9])(\w)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
export function validata_email(value) {
    return reg_email.test(value)
}