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
        this.status = {};
    }
    render(){
        return (
            <Layout className="layout_wrap">
                <Header className="layout_header"><LayoutHeader /></Header>
                <Layout>
                    <Sider width="250px">
                        <LayoutAside />
                    </Sider>
                    <Content className="layout_content">
                        <ContainerMain />
                    </Content>
                </Layout>
            </Layout>
        )
    } 
}

export default Index;