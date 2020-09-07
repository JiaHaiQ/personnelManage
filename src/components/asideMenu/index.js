import React,{ Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import { UserOutlined } from '@ant-design/icons';
import Router from '../../router/index';
const { SubMenu } = Menu;
// console.log(Router)
class asideMenu extends Component {
    constructor(props){
        super(props);
        this.status = {};
    }

    // 菜单
    renderMenu = ({key, title}) => {
        return (
            <Menu.Item key={key}>
                <Link to={key}><span>{title}</span></Link>
            </Menu.Item>
        )
    }
    // 子集菜单
    renderSubMenu = ({key, title, child}) => {
        return <SubMenu key={key} icon={<UserOutlined />} title={title}>
            {
                child && child.map(item => {
                    return item.child && item.child.length > 0 
                    ? this.renderSubMenu(item) : this.renderMenu(item)
                })
            }
        </SubMenu>
    }

    render(){
        return (
            <Fragment>
                <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
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

export default asideMenu;