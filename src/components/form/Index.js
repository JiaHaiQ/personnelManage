import React,{ Component, Fragment } from 'react';
// propTypes
import PropTypes from 'prop-types';
// api
import { requestData } from "@api/common";
// url
import requestUrl from "@api/requestUrl";
// antd
import { Input, Form, Select, Radio, InputNumber, Button, message } from 'antd';
const { Option } = Select;

class FormComponent extends Component{
    constructor(props){
      super(props);
      this.state = {
        loading: false,
        mesPreix: {
            "Input":"请输入",
            "Select":"请选择",
            "Radio":"请选择",
        }
      };
    };
    UNSAFE_componentWillReceiveProps({ formConfig }){
        // 赋值表单
        this.refs.form.setFieldsValue(formConfig.setFieldValue)
    }
    componentDidMount(){
        // 返回子组件实例
        this.props.onRef(this);
    }
    // 验证规则
    rules = (item) => {
        const { mesPreix } = this.state;
        let rules = [];
        let message = item.message || `${mesPreix[item.type]}${item.label}`;
        if(item.required) {
            rules.push({ required: true, message })
        }
        if(item.rules && item.rules.length >0 ) {
            rules = rules.concat(item.rules);
        }
        return rules;
    }
    // input
    inputElem = (item) => {
        const rules = this.rules(item);
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
              <Input style={item.style} placeholder={item.placeholder}/>
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
              <Select  style={item.style} placeholder={item.placeholder}>
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
        const { formItem } = this.props;
        if(!formItem || (formItem && formItem.length === 0)){ return false };
        const formList = [];
        formItem.forEach( item => {
            if(item.type === "Input"){ formList.push(this.inputElem(item)) }
            if(item.type === "InputNumber"){ formList.push(this.inputNumberElem(item)) }
            if(item.type === "Select"){ formList.push(this.selectElem(item)) }
            if(item.type === "Radio"){ formList.push(this.radioElem(item)) }
        })
        return formList;
    }
    // 重置form
    clearableForm = () => {
        this.refs.form.resetFields();
    }
    // 提交
    onSubmit = (value) => {
        // 传入的 submit
        if(this.props.submit) {
            this.props.submit(value);
            return false;
        }
        const data = {
            url: requestUrl[this.props.formConfig.url],
            data: value
        }
        this.setState({ loading: true })
        requestData(data).then( res => {
            message.success(res.data.message)
            this.setState({ loading: false })
        }).catch(error => {
            this.setState({ loading: false })
        })
    }
    render(){
        const { formConfig, formLayout, btnText } = this.props;
        return(
            <Fragment>
                <Form ref="form" initialValues={formConfig.initValue} {...formLayout} onFinish={this.onSubmit} >
                    { this.initFormItem() }
                    <Form.Item>
                    <Button 
                        type="primary" 
                        loading={this.state.loading} 
                        htmlType="submit"
                    >
                        {btnText === "" ? "添加":"修改"}
                    </Button>
                    </Form.Item>
                </Form> 
            </Fragment>
        )
    }
  }
  
// 校验数据类型
FormComponent.propTypes = {
    formConfig: PropTypes.object
}
// 默认值
FormComponent.defaultProps = {
    formConfig: {}
}
  export default FormComponent;