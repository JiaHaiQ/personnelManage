import React, { Component } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import "./hender.scss";
class layoutHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: props.collapsed,
        };
    }
    //监听接收父组件props值变化
    UNSAFE_componentWillReceiveProps({ collapsed }) {
        this.setState({
            collapsed
        })
    }
    toggleMenu = () => {
        this.props.toggle()
    }
    render() {
        const { collapsed } = this.state;
        return (
            <div className={collapsed ? "collapsed-close" : ""}>
                <h1 className="logo"><span>LOGO</span></h1>
                <div className="header-wrap">
                    <span className="collapsed-icon" onClick={this.toggleMenu}>
                        {
                            collapsed === true ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                        }

                    </span>
                </div>
            </div>
        )
    }
}

export default layoutHeader;