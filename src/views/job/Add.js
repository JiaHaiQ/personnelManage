import React, { Component, Fragment } from 'react';
// antd
import { message } from 'antd';
// api
import { DepartmentAddApi, departmentDetailed, editDepartment } from "@api/department";
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
        initValue: {
          number: 1,
          status: true
        },
        setFieldValue: {}
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
    this.getDetailed()
  };
  // 获取子组件实例
  getChildRef = (ref) => {
    this.FormComponent = ref; // 存储子组件
  }
  // 获取部门详情
  getDetailed = () => {
    if (!this.props.location.state) { return false }
    departmentDetailed({ id: this.state.id }).then(res => {
      this.setState({
        formConfig: {
          ...this.state.formConfig,
          setFieldValue: res.data.data
        }
      })
      // 赋值表单
      // this.refs.form.setFieldsValue(res.data.data)
    })
  }
  /** 编辑信息 */
  onHandlerEdit = (value) => {
    let editData = value;
    editData.id = this.state.id
    editDepartment(editData).then(res => {
      message.success(res.data.message);
      this.setState({ loading: false });
      this.getDetailed(editData.id);
    }).catch(error => {
      this.setState({ loading: false })
    })
  }
  /** 添加信息 */
  onHandlerAdd = (value) => {
    let addData = value;
    DepartmentAddApi(addData).then(res => {
      const data = res.data;
      message.success(data.message);
      this.setState({ loading: false });
      // 调用FormComponent组件方法清除表单
      this.FormComponent.clearableForm();
    }).catch(error => {
      this.setState({ loading: false })
    })
  }
  /** 提交表单 */
  onHandlerSubmit = (value) => {
    this.state.id ? this.onHandlerEdit(value) : this.onHandlerAdd(value);
  }
  render() {
    const { formItem, formLayout, formConfig, id } = this.state;
    return (
      <Fragment>
        <FormComponent
          onRef={this.getChildRef}
          formItem={formItem}
          formLayout={formLayout}
          formConfig={formConfig}
          // submit={this.onHandlerSubmit}
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
