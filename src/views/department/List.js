import React,{Component, Fragment} from 'react';
// antd
import { Form, Input, Button, Table, Switch, message } from 'antd';
// api
import { getDepartmentList, deleteDepartment } from "../../api/department";
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
      // 表头
      columns: [
        {title: "部门名称", dataIndex: "name", key: "name"},
        {
          title: "禁启用", 
          dataIndex: "status", 
          key: "status",
          render: (text,rowData) => {
            return <Switch checkedChildren="启用" unCheckedChildren="禁用" defaultChecked={rowData.status === "1" ? true : false} />
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
                <Button type="primary">编辑</Button>
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
  // 删除
  onHandlerDelete = (id) => {
    if(!id){return false}
    deleteDepartment({id}).then(res => {
      message.success(res.data.message);
      this.searchDepartment();
    })
  };
  // 选择复选框
  onCheckBox = (selectedRowKeys) => {
    this.setState({selectedRowKeys})
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
        </Fragment>
    )
  }
}

export default DepartmentList;
