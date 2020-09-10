import React,{ Component, Fragment } from "react";
import "./index.scss";
// antd
import { Form, Input, Button, Row, Col, message } from 'antd';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';
// 验证
import { validata_pass } from '@utils/validata';
// api
import { Register } from "@api/account";
// 组件
import Code from "@c/code/Index";
// 加密
import CryptoJs from "crypto-js";
class RegisterForm extends Component{
    constructor(){
        super();
        this.state = {
            username: "",
            password: "",
            code: "",
            module: "register",
        };    
    };
    // 状态切换
    toggleForm = () => {
        this.props.switchFrom("login");
    }
    // 注册账号
    onRegister = () => {
        const registerData = {
            username: this.state.username,
            password: CryptoJs.MD5(this.state.password).toString(),
            code: this.state.code,
        }
        // console.log('注册参数', registerData);
        Register(registerData).then(res =>{
            message.success(res.data.message)
            this.toggleForm();
        })
    };
    // 输入change
    inputChangeUsername = (e) => {
        let value = e.target.value;
        this.setState({
            username:value
        })
    };
    inputChangePassword = (e) => {
        let value = e.target.value;
        this.setState({
            password:value
        })
    };
    inputChangeCode = (e) => {
        let value = e.target.value;
        this.setState({
            code:value
        })
    };

    render(){
        const { username, module } = this.state;
        return (
            <Fragment>
                <div className="from-header">
                    <h4 className="column">账号注册</h4>
                    <span onClick={this.toggleForm}>登录</span>
                </div>
                <div className="from-content">
                    <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={this.onRegister}
                    >
                    <Form.Item name="username" rules={[
                        { required: true, message: '请输入邮箱！' },
                        { type: "email", message: '邮箱格式有误！' }
                    ]} >
                        <Input 
                        value={ username } 
                        prefix={<UserOutlined className="site-form-item-icon" />} 
                        placeholder="邮箱"
                        onChange={this.inputChangeUsername}
                        />
                    </Form.Item>

                    <Form.Item name="password" rules={[
                        { required: true, message: '请输入密码' },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                let passwords_value = getFieldValue("passwords");
                                if (validata_pass(value)) {
                                    return Promise.resolve()
                                };
                                if (passwords_value && value !== passwords_value) {
                                    return Promise.reject('密码不一致');
                                };
                                return Promise.reject('请输入数字+字母、长度大于6小于16的密码！');
                                
                            },
                        }),
                    ]} >
                        <Input 
                        type="password" 
                        prefix={<UnlockOutlined className="site-form-item-icon" />} 
                        placeholder="密码" 
                        onChange={this.inputChangePassword}
                        />
                    </Form.Item>

                    <Form.Item name="passwords" rules={[
                        { required: true, message: '再次确认密码不能为空!' },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (value === getFieldValue("password")) {
                                    return Promise.resolve();
                                } 
                                return Promise.reject('密码不一致');
                            },
                        }),
                    ]}>
                        <Input type="password" prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="请确认密码" />
                    </Form.Item>

                    <Form.Item name="Code" rules={[
                         { required: true, message: '请输入验证码！' },
                         { len:6, message: "验证码为6位"}
                    ]}>
                        <Row gutter={13}>
                            <Col span={15}>
                                <Input 
                                prefix={<UnlockOutlined className="site-form-item-icon" />} 
                                placeholder="验证码" 
                                onChange={this.inputChangeCode}
                                />
                            </Col>
                            <Col span={9}>
                                <Code username={username} module={module}/>
                            </Col>
                        </Row>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" block htmlType="submit" className="login-form-button">注册</Button>
                    </Form.Item>
                    </Form>
                </div>
            </Fragment>
        )
    }
}

export default RegisterForm;