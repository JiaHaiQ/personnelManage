import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addDepartmentListAction, updateDepartmentListAction } from '@/store/action/Department';
// api
import { TableList } from "@api/common";
// url
import requestUrl from "@api/requestUrl";
// antd
import { Input, Form, Select, Radio, InputNumber, Button } from 'antd';
const { Option } = Select;
/** FormSearch组件 */
class FormSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            mesPreix: {
                "Input": "请输入",
                "Select": "请选择",
                "Radio": "请选择",
            }
        };
    };
    UNSAFE_componentWillReceiveProps({ formConfig }) {
        // 赋值表单
        this.refs.form.setFieldsValue(formConfig.setFieldValue)
    }
    componentDidMount() {
        this.onSubmit()
    }
    // 验证规则
    rules = (item) => {
        const { mesPreix } = this.state;
        let rules = [];
        let message = item.message || `${mesPreix[item.type]}${item.label}`;
        if (item.required) {
            rules.push({ required: true, message })
        }
        if (item.rules && item.rules.length > 0) {
            rules = rules.concat(item.rules);
        }
        return rules;
    }
    // input
    inputElem = (item) => {
        const rules = this.rules(item);
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
                <Input style={item.style} placeholder={item.placeholder} />
            </Form.Item>
        )
    }
    // InputNumber
    inputNumberElem = (item) => {
        const rules = this.rules(item);
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
                <InputNumber min={item.min} max={item.max} />
            </Form.Item>
        )
    }
    // select
    selectElem = (item) => {
        const rules = this.rules(item);
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
                <Select style={item.style} placeholder={item.placeholder}>
                    {
                        item.options && item.options.map(elem => {
                            return <Option value={elem.value} key={elem.value}>{elem.label}</Option>
                        })
                    }
                </Select>
            </Form.Item>
        )
    }
    // radio
    radioElem = (item) => {
        const rules = this.rules(item);
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
                <Radio.Group>
                    {
                        item.options && item.options.map(elem => {
                            return <Radio value={elem.value} key={elem.value}>{elem.label}</Radio>
                        })
                    }
                </Radio.Group>
            </Form.Item>
        )
    }
    // 初始化
    initFormItem = () => {
        const { formItem, config } = this.props;
        if (!formItem || (formItem && formItem.length === 0)) { return false };
        const formList = [];
        formItem.forEach(item => {
            if (item.type === "Input") { formList.push(this.inputElem(item)) }
            if (item.type === "InputNumber") { formList.push(this.inputNumberElem(item)) }
            if (item.type === "Select") {
                item.options = config[item.optionsKey];
                formList.push(this.selectElem(item))
            }
            if (item.type === "Radio") { formList.push(this.radioElem(item)) }
        })
        return formList;
    }
    search = (params) => {
        const requestData = {
            url: requestUrl[params.url],
            data: {
                pageNumber: 1,
                pageSize: 10,
            }
        }
        // 筛选数据过滤
        if (JSON.stringify(params.searchData) !== "{}") {
            for (let key in params.searchData) {
                requestData.data[key] = params.searchData[key]
            }
        }
        TableList(requestData).then(res => {
            const listData = res.data.data;
            // store-actions
            this.props.searchListdata.addData(listData)
        }).catch(error => {

        })
    }
    // 提交
    onSubmit = (value) => {
        let searchData = {};
        for (let key in value) {
            if (value[key] !== undefined && value[key] !== "") {
                searchData[key] = value[key]
            }
        }
        this.search({
            url: "departmentList",
            searchData
        })
    }
    render() {
        const { formConfig, formLayout } = this.props;
        return (
            <Fragment>
                <Form layout="inline" ref="form" initialValues={formConfig.initValue} {...formLayout} onFinish={this.onSubmit} >
                    {this.initFormItem()}
                    <Form.Item>
                        <Button
                            type="primary"
                            loading={this.state.loading}
                            htmlType="submit"
                        >
                            搜索
                    </Button>
                    </Form.Item>
                </Form>
            </Fragment>
        )
    }
}

// 校验数据类型
FormSearch.propTypes = {
    formConfig: PropTypes.object
}
// 默认值
FormSearch.defaultProps = {
    formConfig: {}
}
const mapStateToProps = (state) => ({
    config: state.config
})
const mapDispatchToProps = (dispatch) => {
    return {
        searchListdata: bindActionCreators({
            addData: addDepartmentListAction,
            upData: updateDepartmentListAction
        }, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FormSearch);