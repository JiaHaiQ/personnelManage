import service from "@/utils/request";

/**登录 */
export function Login(data){
    return service.request({
        url: "/login/",
        method: "post",
        data
    })
}

/**注册 */
export function Register(data){
    return service.request({
        url: "/register/",
        method: "post",
        data
    })
}

/**获取验证码 */
export function GetCode(data){
    // console.log(JSON.stringify(data))
    return service.request({
        url: "/getSms/",
        method: "post",
        data
    })
}