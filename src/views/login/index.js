import React,{ Component } from "react";
import "./index.scss";
//组件
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
class Login extends Component{
    constructor(){
        super();
        this.state = {
            formType:"login",
        };    
    };

    switchFrom = (value) => {
        this.setState({
            formType: value
        })
    };

    render(){
        return (
            <div className="from-wrap">
                <div>
                    {this.state.formType === "login" 
                    ? <LoginForm switchFrom={this.switchFrom}></LoginForm> 
                    : <RegisterForm switchFrom={this.switchFrom}></RegisterForm>
                    }
                </div>
            </div>
        )
    }
}

export default Login;