import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu } from "antd";
import { UserOutlined } from '@ant-design/icons';
import Router from '@/router/Index';
const { SubMenu } = Menu;
/** 左侧菜单组件 */
class asideMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedKeys: [],
            openKeys: []
        };
    }
    componentDidMount() {
        const pathname = this.props.location.pathname;
        const menuKey = pathname.split("/").slice(0, 3).join("/");
        const menuHigh = {
            selectedKeys: pathname,
            openKeys: menuKey
        }
        this.selectMenuHigh(menuHigh);
    }

    // 选择菜单
    selectMenu = ({ key, keyPath }) => {
        const menuHigh = {
            selectedKeys: key,
            openKeys: keyPath[keyPath.length - 1]
        }
        this.selectMenuHigh(menuHigh);
    }
    // 菜单高光
    selectMenuHigh = ({ selectedKeys, openKeys }) => {
        this.setState({
            selectedKeys: [selectedKeys],
            openKeys: [openKeys]
        })
    }
    openMenu = (openKeys) => {
        // console.log(openKeys)
        this.setState({
            openKeys: [openKeys[openKeys.length - 1]]
        })
    }
    // 菜单
    renderMenu = ({ key, title }) => {
        return (
            <Menu.Item key={key}>
                <Link to={key}><span>{title}</span></Link>
            </Menu.Item>
        )
    }
    // 子集菜单
    renderSubMenu = ({ key, title, child }) => {
        return <SubMenu key={key} icon={<UserOutlined />} title={title}>
            {
                child && child.map(item => {
                    return item.child && item.child.length > 0
                        ? this.renderSubMenu(item) : this.renderMenu(item)
                })
            }
        </SubMenu>
    }

    render() {
        const { selectedKeys, openKeys } = this.state;
        return (
            <Fragment>
                <Menu
                    onOpenChange={this.openMenu}
                    onClick={this.selectMenu}
                    theme="dark"
                    mode="inline"
                    selectedKeys={selectedKeys}
                    openKeys={openKeys}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    {
                        Router && Router.map(firstItem => {
                            return firstItem.child && firstItem.child.length > 0
                                ? this.renderSubMenu(firstItem) : this.renderMenu(firstItem)
                        })
                    }
                </Menu>
            </Fragment>
        )
    }
}

export default withRouter(asideMenu);