import React,{Component, Fragment} from 'react';
import { Link } from 'react-router-dom';
// antd
import { Form, Input, Button, Table, Switch, message, Modal, Space } from 'antd';
// api
import { getDepartmentList, deleteDepartment, departmentStatus } from "@api/department";
class DepartmentList extends Component{
  constructor(props){
    super(props);
    this.state = {
      // 搜索参数
      pageNumber: 1,
      pageSize: 10,
      keyWord: "",
      // 复选框
      selectedRowKeys: [],
      // 删除弹框
      visible: false,
      confirmLoading: false,
      id: "",
      // 表头
      columns: [
        {title: "部门名称", dataIndex: "name", key: "name"},
        {
          title: "禁启用", 
          dataIndex: "status", 
          key: "status",
          render: (text,rowData) => {
            return (
              <Switch 
              checkedChildren="启用" 
              unCheckedChildren="禁用" 
              defaultChecked={rowData.status === "1" ? true : false} 
              onChange={()=>this.onHandlerSwitch(rowData)}
              />
            )
          }
        },
        {title: "人员数量", dataIndex: "number", key: "number"},
        {
          title: "操作", 
          dataIndex: "open", 
          key: "open", 
          width: 215,
          render: (text,rowData) => {
            return (
              <div className="inline-button">
                <Button type="primary" onClick={()=>this.onHandlerEdit(rowData.id)}>
                  <Link to={{pathname:"/index/department/add",state:{id:rowData.id}}}>编辑</Link>
                </Button>
                <Button type="danger" onClick={()=>this.onHandlerDelete(rowData.id)}>删除</Button>
              </div>
            )
          }
        }
      ],
      // 表数据
      data: []
    };
  };
  componentDidMount(){
    this.searchDepartment()
  }
  /** 搜索部门 */
  searchDepartment = () => {
    const {pageNumber, pageSize, keyWord} = this.state;
    const searchData = {
      pageNumber,
      pageSize
    }
    if(keyWord){
      searchData.name = keyWord
    }
    getDepartmentList(searchData).then(res => {
      // console.log(res)
      const listData = res.data.data;
      if(listData){
        this.setState({
          data: listData.data
        })
      }
    })
  };
  // 搜索按钮触发
  onFinish = (value) => {
    this.setState({
      pageNumber: 1,
      pageSize: 10,
      keyWord: value.name,
    })
    this.searchDepartment()
  }
  // 删除部门
  onHandlerDelete(id){
    if(!id){return false}
    this.setState({
      visible: true,
      id
    })
  };
  // 禁启用
  onHandlerSwitch(data){
    if(!data){return false}
    // console.log(typeof data.status)
    let statusData = {
      id: Number(data.id),
      status: data.status === 1 ? false : true
    }
    // console.log(JSON.stringify(statusData))
    departmentStatus(statusData).then(res => {
      message.success(res.data.message);
      // this.searchDepartment();
    })
  }
  // 编辑
  onHandlerEdit(id){

  }
  // 选择复选框
  onCheckBox = (selectedRowKeys) => {
    this.setState({selectedRowKeys})
  }
  // 窗口弹出
  modalThen = () => {
    this.setState({confirmLoading: true})
    deleteDepartment({id:this.state.id}).then(res => {
      message.success(res.data.message);
      this.setState({
        visible: false,
        confirmLoading: false,
        id: ""
      })
      this.searchDepartment();
    })
  }

  render(){
    const {columns, data} = this.state;
    const rowSelection = {
      onChange: this.onCheckBox
    }
    return(
        <Fragment>
            <Form layout="inline" onFinish={this.onFinish}>
              <Form.Item label="部门名称" name="name">
                <Input placeholder="请输入部门名称"/>
              </Form.Item> 
              <Button loading={this.state.loading} type="primary" htmlType="submit">搜索</Button>
            </Form>  
            <div className="table-wrap">
              <Table rowSelection={rowSelection} rowKey="id" columns={columns} dataSource={data} bordered></Table>
            </div>
            <Modal
            title="提示"
            visible={this.state.visible}
            onOk={this.modalThen}
            onCancel={()=>{this.setState({visible:false})}}
            okText="确认"
            cancelText="取消"
            confirmLoading={this.state.confirmLoading}
          >
            <p className="text-center">确定删除此信息？<Space className="color-red">删除后无法恢复。</Space></p>
          </Modal>
        </Fragment>
    )
  }
}

export default DepartmentList;
