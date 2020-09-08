import React,{ Component } from "react";
import "./layout.scss"
// 组件
import LayoutAside from "./components/aside";
import LayoutHeader from "./components/header";
import ContainerMain from "../../components/containerMain/index";
// antd
import { Layout } from 'antd';
const { Sider, Header, Content} = Layout;

class Index extends Component {
    constructor(props){
        super(props);
        this.state = {
            collapsed: false,
        };
    }
    componentDidMount(){
        const collapsed = JSON.parse(sessionStorage.getItem('collapsed'))
        this.setState({collapsed})
    }
    toggleCollapsed = () => {
        const collapsed = !this.state.collapsed
        this.setState({collapsed})
        sessionStorage.setItem('collapsed',collapsed)
    }
    render(){
        const {collapsed} = this.state;
        return (
            <Layout className="layout-wrap">
                <Header className="layout-header">
                    <LayoutHeader toggle={this.toggleCollapsed} collapsed={collapsed} />
                </Header>
                <Layout>
                    <Sider width="250px" collapsed={collapsed}>
                        <LayoutAside />
                    </Sider>
                    <Content className="layout-content">
                        <ContainerMain />
                    </Content>
                </Layout>
            </Layout>
        )
    } 
}

export default Index;