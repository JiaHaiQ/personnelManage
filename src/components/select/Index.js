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
            options: []
        };
    };
    componentDidMount() {
        this.getSelectList();
    }
    getSelectList = () => {
        const url = requestUrl[this.props.url];
        const data = {
            url,
            data: {}
        }
        requestData(data).then(res => {
            this.setState({
                options: res.data.data.data
            })
        })
    }
    render() {
        const { options } = this.state;
        const { value, label } = this.state.props
        return (
            <Fragment>
                <Select>
                    {
                        options && options.map(elem => {
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