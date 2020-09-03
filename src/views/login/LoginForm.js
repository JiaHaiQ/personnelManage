import React,{ Component, Fragment } from "react";
import "./index.scss";
// antd
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';
// 验证
import { validata_password } from '../../utils/validata';
// api
import { Login } from "../../api/account";
//组件
import Code from "../../components/code/index";

class LoginForm extends Component{
    constructor(){
        super();
        this.state = {
            username: "",
            code_btn_loading: false,
            code_btn_disabled: false,
            code_btn_text: "获取验证码",
        };    
    };

    toggleForm = () => {
        this.props.switchFrom("register");
    }
    // 登录
    onFinish = (values) => {
        // console.log('登录参数', values);
        Login().then(res =>{
            // console.log(res)
        }).catch(error => {
            // console.log(error)
        })
    };
    // 用户名输入change
    inputChange = (e) => {
        let value = e.target.value;
        this.setState({
            username:value
        })
    };
    
    render(){
        const { username } = this.state;
        // const _this = this;
        return (
            <Fragment>
                <div className="from-header">
                    <h4 className="column">登录</h4>
                    <span onClick={this.toggleForm}>账号注册</span>
                </div>
                <div className="from-content">
                    <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                    >
                    <Form.Item name="username" rules={
                        [
                            { required: true, message: '请输入邮箱！' },
                            { type: "email", message:'邮箱格式有误！' }
                            // ({ getFieldValue }) => ({
                            //     validator(rule, value) {
                            //       if (validata_email(value)) {
                            //           _this.setState({
                            //             code_btn_disabled:false,
                            //           })
                            //         return Promise.resolve();
                            //       } 
                            //         return Promise.reject('邮箱格式有误!');
                            //     },
                            // }),
                        ]
                    }>
                        <Input value={ username } onChange={this.inputChange} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="邮箱" />
                    </Form.Item>

                    <Form.Item name="password" rules={
                        [
                            { required: true, message: '请输入密码！' },
                            { pattern: validata_password, message: "请输入数字+字母、长度大于6小于16的密码！"}
                        ]
                    }>
                        <Input prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="密码" />
                    </Form.Item>

                    <Form.Item name="Code" rules={
                        [
                            { required: true, message: '请输入验证码！' },
                            { len:6, message: "验证码为6位"}
                        ]
                    }>
                        <Row gutter={13}>
                            <Col span={15}>
                                <Input prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="验证码" />
                            </Col>
                            <Col span={9}>
                                <Code username={username} />
                            </Col>
                        </Row>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" block htmlType="submit" className="login-form-button">登录</Button>
                    </Form.Item>
                    </Form>
                </div>
            </Fragment>
        )
    }
}

export default LoginForm;