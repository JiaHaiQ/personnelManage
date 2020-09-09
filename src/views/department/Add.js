import React,{Component} from 'react';
// antd
import { Form, Input, Button, InputNumber, Radio, message } from 'antd';
// api
import { DepartmentAddApi } from "../../api/department";
class DepartmentAdd extends Component{
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      formLayout: {
        labelCol: {span:2},
        wrapperCol: {span:20}
      }
    };
  };
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
    DepartmentAddApi(value).then(res =>{
      // console.log(res)
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
  render(){
    return(
        <Form 
        ref="form"
        initialValues={{status:true,number:0}}
        {...this.state.formLayout}
        onFinish={this.onSubmit}
        >
            <Form.Item label="部门名称" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="部门人数" name="number">
              <InputNumber min={0} max={100}/>
            </Form.Item>
            <Form.Item label="禁启用" name="status">
              <Radio.Group>
                <Radio value={true}>启用</Radio>
                <Radio value={false}>禁用</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="描述" name="content">
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <Button loading={this.state.loading} type="primary" htmlType="submit">确定</Button>
            </Form.Item>    
        </Form>
    )
  }
}

export default DepartmentAdd;
