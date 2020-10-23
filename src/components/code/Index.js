import React, { Component } from "react";
// antd
import { Button, message } from 'antd';
// 验证
import { validata_email } from '@utils/validata';
//api
import { GetCode } from "@api/account";
// 定时器
let timer = null;
/** 获取验证码组件 */
class Code extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.username,
            btn_text: "获取验证码",
            btn_loading: false,
            btn_disabled: false,
            module: props.module
        };
    };
    //监听接收父组件的传值
    static getDerivedStateFromProps(nextProps, prevState) {
        let { username } = nextProps
        if (!username) { return false }
        if (username !== prevState.username) {
            return {
                username
            }
        }
        return null
    }
    // 组件销毁
    componentWillUnmount() {
        clearInterval(timer);
    }
    /** 获取验证码 */
    getCode = () => {
        // console.log(process.env.REACT_APP_API)
        // console.log(process.env.REACT_APP_BASE_URL)
        // console.log("获取验证码",this.state.username)
        const username = this.state.username;
        if (!username) {
            message.warning("用户名不能为空！", 2);
            return false;
        }
        if (!validata_email(username)) {
            message.warning("邮箱格式有误！", 2);
            return false;
        }
        this.setState({
            btn_loading: true,
            btn_text: "发送中"
        })
        const requestData = {
            username,
            module: this.state.module
        }
        GetCode(requestData).then(res => {
            message.success(res.data.message);
            // console.log(res);
            this.countDown();
        }).catch(error => {
            this.setState({
                btn_loading: false,
                btn_text: "重新获取"
            })
        })
    };
    /** 倒计时 */
    countDown = () => {
        let sec = 30;
        this.setState({
            btn_loading: false,
            btn_disabled: true,
            btn_text: `${sec}s`
        });
        timer = setInterval(() => {
            sec--;
            if (sec <= 0) {
                this.setState({
                    btn_disabled: false,
                    btn_text: "重新获取"
                });
                clearInterval(timer);
                return false;
            }
            this.setState({
                btn_text: `${sec}s`
            });
        }, 1000)
    };

    render() {
        return (
            <Button
                type="danger"
                block
                disabled={this.state.btn_disabled}
                loading={this.state.btn_loading}
                onClick={this.getCode}
            >{this.state.btn_text}</Button>
        )
    }
}

export default Code;