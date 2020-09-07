import React,{ Component, Fragment } from "react";
import "./hender.scss";
class header extends Component {
    constructor(props){
        super(props);
        this.status = {};
    }
    render(){
        return (
            <Fragment>
                <h1 className="logo"><span>LOGO</span></h1>
            </Fragment>
        )
    } 
}

export default header;