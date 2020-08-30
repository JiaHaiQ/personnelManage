import React,{ Component, Fragment } from "react";
import "./index.scss";

//antd
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';
class LoginForm extends Component{
    constructor(){
        super();
        this.state = {};    
    };

    onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    toggleForm = () => {
        this.props.switchFrom("register");
    }
    
    render(){
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
                    onFinish={() => this.onFinish}
                    >
                    <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>

                    <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
                        <Input prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="Password" />
                    </Form.Item>

                    <Form.Item name="Code" rules={[{ required: true, message: 'Please input your Code!' }]}>
                        <Row gutter={13}>
                            <Col span={15}>
                                <Input prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="Code" />
                            </Col>
                            <Col span={9}>
                                <Button type="primary" block danger>获取验证码</Button>
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