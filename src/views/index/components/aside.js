import React,{ Component } from "react";
import AsideMenu from "../../../components/asideMenu/index";
class layoutAside extends Component {
    constructor(props){
        super(props);
        this.status = {};
    }
    render(){
        return (
            <AsideMenu />
        )
    } 
}

export default layoutAside;