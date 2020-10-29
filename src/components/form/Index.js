import React, { Component, Fragment } from 'react';
// propTypes
import PropTypes from 'prop-types';
// api
import { requestData } from "@api/common";
// url
import requestUrl from "@api/requestUrl";
// 数据
import Store from '@/store/Index';
//Component
import SelectComponent from "@c/select/Index";
// antd
import { Input, Form, Select, Radio, InputNumber, Button, message } from 'antd';
const { Option } = Select;
/** Form组件 */
class FormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            mesPreix: {
                "Input": "请输入",
                "InputNumber": "请输入",
                "Select": "请选择",
                "SelectComponent": "请选择",
                "Radio": "请选择",
            }
        };
    };
    // 监听props
    UNSAFE_componentWillReceiveProps({ formConfig }) {
        // 赋值表单
        this.refs.form.setFieldsValue(formConfig.setFieldValue)
    }
    componentDidMount() {
        // 返回子组件实例
        if (this.props.onRef) {
            this.props.onRef(this);
        }
    }
    // 验证规则
    rules = (item) => {
        const { mesPreix } = this.state;
        let rules = [];
        let message = item.message || `${mesPreix[item.type]}${item.label}！`;
        if (item.required) {
            rules.push({ required: true, message })
        }
        if (item.rules && item.rules.length > 0) {
            rules = rules.concat(item.rules);
        }
        return rules;
    }
    /** 检验select组件 */
    validatorSelect = (rule, value) => {
        if (value || value[rule.field]) {
            return Promise.resolve();
        }
        return Promise.reject('选项不能为空！');
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
    // SelectComponent
    SelectComponentElem = (item) => {
        const rules = this.rules(item);
        return (
            <Form.Item
                label={item.label}
                name={item.name}
                key={item.name}
                rules={[...rules, { validator: this.validatorSelect }]}
            >
                <SelectComponent
                    url={item.url}
                    propsKey={item.propsKey}
                    name={item.name}
                    style={item.style}
                    placeholder={item.placeholder}
                />
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
    // slot插槽
    slotElem = (item) => {
        const rules = this.rules(item);
        return (
            <Form.Item
                label={item.label}
                name={item.name}
                key={item.name}
                rules={rules}
            >
                {this.props.children && Array.isArray(this.props.children) ? this.props.children.filter(elem => elem.ref === item.slotName) : this.props.children}
            </Form.Item>
        )
    }
    // 初始化
    initFormItem = () => {
        const { formItem } = this.props;
        if (!formItem || (formItem && formItem.length === 0)) { return false };
        const formList = [];
        formItem.forEach(item => {
            if (item.type === "Input") { formList.push(this.inputElem(item)) }
            if (item.type === "InputNumber") { formList.push(this.inputNumberElem(item)) }
            if (item.type === "Select") {
                if (item.optionsKey) {
                    item.options = Store.getState().config[item.optionsKey];
                }
                formList.push(this.selectElem(item))
            }
            if (item.type === "SelectComponent") {
                formList.push(this.SelectComponentElem(item))
            }
            if (item.type === "Radio") { formList.push(this.radioElem(item)) }
            if (item.type === "slot") { formList.push(this.slotElem(item)) }
        })
        return formList;
    }
    /** 重置form */
    clearableForm = () => {
        this.refs.form.resetFields();
    }
    /** 参数为JSON对象时处理 */
    formatData = (value) => {
        const data = JSON.parse(JSON.stringify(value));
        const { formatFormKey, editKey, setFieldValue } = this.props.formConfig
        const keyValue = data[formatFormKey]
        // 如果是JSON对象
        if (Object.prototype.toString.call(keyValue) === "[object Object]") {
            data[formatFormKey] = keyValue[formatFormKey]
        }
        // 是否存在编辑key
        if (editKey) {
            data[editKey] = setFieldValue[editKey]
        }
        return data
    }
    /** 提交 */
    onSubmit = (value) => {
        // 传入的 submit
        if (this.props.submit) {
            this.props.submit(value);
            return false;
        }
        const request = this.formatData(value)
        const data = {
            url: requestUrl[this.props.formConfig.url],
            data: request
        }
        this.setState({ loading: true })
        requestData(data).then(res => {
            message.success(res.data.message)
            // 如果不是修改，清空form
            let edit = this.props.formConfig.editKey
            if (!edit || edit === "") {
                this.clearableForm();
            } else {
                // 修改之后调用父组件获取详情
                this.props.getDetailed()
            }
            this.setState({ loading: false })
        }).catch(error => {
            this.setState({ loading: false })
        })
    }
    render() {
        const { formConfig, formLayout, btnText } = this.props;
        return (
            <Fragment>
                <Form ref="form" initialValues={formConfig.initValue} {...formLayout} onFinish={this.onSubmit} >
                    {this.initFormItem()}
                    <Form.Item>
                        <Button
                            type="primary"
                            loading={this.state.loading}
                            htmlType="submit"
                        >
                            {btnText === "" ? "添加" : "修改"}
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

/**
 * import FormComponent from '@c/form/Index';
 * <FormComponent
        onRef={this.getChildRef}
        formItem={formItem}
        formLayout={formLayout}
        formConfig={formConfig}
        submit={this.onHandlerSubmit}
        btnText={id}
    />
 *
 *    this.state = {
      formConfig: {
        url: "jobAdd", // url
        editKey: "jobId", // 编辑需要的key
        initValue: {
          number: 1,
          status: true
        }, // 默认值
        setFieldValue: {}, form数据
        //格式化select数据
        formatFormKey: "parentId"
      },
      formLayout: {
        labelCol: { span: 2 },
        wrapperCol: { span: 20 }
      },
      formItem: [
        {
          type: "SelectComponent",
          url: "getDepartmentList",
          propsKey: {
            value: "id",
            label: "name"
          },
          label: "部门名称",
          name: "parentId",
          required: true,
          style: { width: "300px" },
          placeholder: "请选择部门"
        },
        {
          type: "Input",
          label: "职位名称",
          name: "jobName",
          required: true,
          style: { width: "200px" },
          placeholder: "请输入职位名称"
        },
        {
          type: "Radio",
          label: "禁启用",
          name: "status",
          required: true,
          options: [
            { label: "启用", value: true },
            { label: "禁用", value: false },
          ],
        },
        {
          type: "Input",
          label: "描述",
          name: "content",
          required: true,
          placeholder: "请输入描述内容"
        },
      ]
    };
  };
 *
 */