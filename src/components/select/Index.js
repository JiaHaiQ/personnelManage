import React, { Component, Fragment } from 'react';
// propTypes
import PropTypes from 'prop-types';
// api
import { requestData } from "@api/common";
// url
import requestUrl from "@api/requestUrl";
// antd
import { Select } from 'antd';
const { Option } = Select;
/** Select组件 */
class SelectComponent extends Component {
    constructor(props) {
        super();
        this.state = {
            props: props.propsKey,
            options: [],
            value: "",
            name: props.name
        };
    };
    componentDidMount() {
        this.getSelectList();
    }
    /** 获取下拉数据 */
    getSelectList = () => {
        const url = requestUrl[this.props.url];
        const data = {
            url,
            data: {}
        }
        if (!data.url) { return false }
        requestData(data).then(res => {
            this.setState({
                options: res.data.data.data
            })
        })
    }
    triggerChange = (changedValue) => {
        const onChange = this.props.onChange;
        if (onChange) {
            onChange({ [this.state.name]: changedValue });
        }
    }
    onChange = (value) => {
        this.setState({ value })
        this.triggerChange(value);
    }
    render() {
        const { value, label } = this.state.props;
        const { style, placeholder } = this.props;
        return (
            <Fragment>
                <Select value={this.state.value} onChange={this.onChange} style={style} placeholder={placeholder}>
                    {
                        this.state.options && this.state.options.map(elem => {
                            return <Option value={elem[value]} key={elem[value]}>{elem[label]}</Option>
                        })
                    }
                </Select>
            </Fragment>
        )
    }
}

// 校验数据类型
SelectComponent.propTypes = {
    formConfig: PropTypes.object
}
// 默认值
SelectComponent.defaultProps = {
    formConfig: {}
}
export default SelectComponent;