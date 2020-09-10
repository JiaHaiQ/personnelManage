import React,{ Component } from "react";
import AsideMenu from "@c/asideMenu/Index";
class layoutAside extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return (
            <AsideMenu />
        )
    } 
}

export default layoutAside;