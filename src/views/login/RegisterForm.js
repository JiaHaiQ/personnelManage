import React,{ Component, Fragment } from "react";
import "./index.scss";

//antd
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';
//组件
import Code from "../../components/code/index";

class RegisterForm extends Component{
    constructor(){
        super();
        this.state = {
            username:""
        };    
    };

    onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    toggleForm = () => {
        this.props.switchFrom("login");
    }

    render(){
        const { username } = this.state;
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
                    onFinish={() => this.onFinish}
                    >
                    <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>

                    <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
                        <Input prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="Password" />
                    </Form.Item>

                    <Form.Item name="passwords" rules={[{ required: true, message: 'Please input your Passwords!' }]}>
                        <Input prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="Password" />
                    </Form.Item>

                    <Form.Item name="Code" rules={[{ required: true, message: 'Please input your Code!' }]}>
                        <Row gutter={13}>
                            <Col span={15}>
                                <Input prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="Code" />
                            </Col>
                            <Col span={9}>
                                <Code username={username} />
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