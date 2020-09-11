import React,{Component} from 'react';
// antd
import { Form, Input, Button, InputNumber, Radio, message } from 'antd';
// api
import { DepartmentAddApi, departmentDetailed, editDepartment } from "@api/department";
class DepartmentAdd extends Component{
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      id: "",
      formLayout: {
        labelCol: {span:2},
        wrapperCol: {span:20}
      }
    };
  };
  componentWillMount(){
    if(this.props.location.state) {
      this.setState({id:this.props.location.state.id})
    }
  };
  componentDidMount(){
    this.getDetailed()
  };
  // 获取部门详情
  getDetailed = () => {
    if(!this.props.location.state){return false}
    departmentDetailed({id:this.state.id}).then(res => {
      // console.log(res.data.data)
      this.refs.form.setFieldsValue(res.data.data)
    })
  }
  // 提交添加
  onSubmit = (value) => {
    // console.log(value)
    if(!value.name){
      message.error("请输入部门名称！")
      return false
    }
    if(!value.number || value.number===0){
      message.error("人员数量不能为0")
      return false
    }
    if(!value.content){
      message.error("请输入部门描述！")
      return false
    }
    this.setState({
      loading:true
    })
    this.state.id ? this.onHandlerEdit(value) : this.onHandlerAdd(value)
  }
  /** 添加信息 */
  onHandlerAdd = (value) => {
    DepartmentAddApi(value).then(res =>{
      const data = res.data
      message.success(data.message)
      this.setState({
        loading:false
      });
      // 重置form
      this.refs.form.resetFields();
    }).catch(error => {
      this.setState({
        loading:false
      })
    })
  }
  /** 编辑信息 */
  onHandlerEdit = (value) => {
    let editData = value;
    editData.id = this.state.id
    editDepartment(editData).then(res => {
      message.success(res.data.message)
      this.setState({loading:false})
    }).catch(error => {
      this.setState({loading:false})
    })
  }
  render(){
    return(
        <Form 
        ref="form"
        initialValues={{status:true,number:0}}
        {...this.state.formLayout}
        onFinish={this.onSubmit}
        >
            <Form.Item 
            label="部门名称" 
            name="name" 
            rules={[{required:true,message:"请输入部门名称!"}]}
            >
              <Input placeholder="请输入部门名称"/>
            </Form.Item>
            <Form.Item label="部门人数" name="number">
              <InputNumber min={0} max={100} />
            </Form.Item>
            <Form.Item label="禁启用" name="status">
              <Radio.Group>
                <Radio value={true}>启用</Radio>
                <Radio value={false}>禁用</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item 
            label="描述" 
            name="content" 
            rules={[{required:true,message:"请输入部门描述!"}]}
            >
              <Input.TextArea placeholder="请输入部门描述"/>
            </Form.Item>
            <Form.Item>
              <Button loading={this.state.loading} type="primary" htmlType="submit">确定</Button>
            </Form.Item>    
        </Form>
    )
  }
}

export default DepartmentAdd;
