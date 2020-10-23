import React, { Component, Fragment } from 'react';
// antd
// import { message } from 'antd';
// api
import { jobDetailed } from "@api/job";
// form组件
import FormComponent from '@c/form/Index';
class DepartmentAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      id: "",
      formConfig: {
        url: "jobAdd",
        editKey: "",
        initValue: {
          number: 1,
          status: true
        },
        setFieldValue: {},
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
  UNSAFE_componentWillMount() {
    if (this.props.location.state) {
      this.setState({ id: this.props.location.state.id })
    }
  };
  componentDidMount() {
    this.state.id && this.getDetailed()
  };
  // 获取职位详情
  getDetailed = () => {
    if (!this.props.location.state) { return false }
    jobDetailed({ id: this.state.id }).then(res => {
      this.setState({
        formConfig: {
          ...this.state.formConfig,
          setFieldValue: res.data.data,
          url: "jobEdit",
          editKey: "jobId"
        }
      })
    })
  }
  /** 提交表单 */
  onHandlerSubmit = (value) => {
    console.log(this.state.id);
    // this.state.id ? this.onHandlerEdit(value) : this.onHandlerAdd(value);
  }
  render() {
    const { formItem, formLayout, formConfig, id } = this.state;
    return (
      <Fragment>
        <FormComponent
          formItem={formItem}
          formLayout={formLayout}
          formConfig={formConfig}
          getDetailed = {this.getDetailed}
          btnText={id}
        />
        {/* <FormComponent
          onRef={this.getChildRef}
          formItem={formItem}
          formLayout={formLayout}
          formConfig={formConfig}
          submit={this.onHandlerSubmit}
          btnText={id}
        /> */}
      </Fragment>
    )
  }
}

export default DepartmentAdd;
