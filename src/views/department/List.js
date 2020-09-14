import React,{Component, Fragment} from 'react';
import { Link } from 'react-router-dom';
// antd
import { Button, Switch, message } from 'antd';
// api
import { departmentStatus } from "@api/department";
// 组件
import TableComponent from '@c/tableData/Index';
class DepartmentList extends Component{
  constructor(props){
    super(props);
    this.state = {
      // 搜索参数
      pageNumber: 1,
      pageSize: 10,
      keyWord: "",
      // 表格加载
      loadingTable: false,
      id: "",
      tableConfig: {
        url: "departmentList",
        checkbox: true,
        thead: [
          {title: "部门名称", dataIndex: "name", key: "name"},
          {
            title: "禁启用", 
            dataIndex: "status", 
            key: "status",
            render: (status,rowData) => {
              return (
                <Switch 
                  loading={rowData.id === this.state.id}
                  checkedChildren="启用" 
                  unCheckedChildren="禁用" 
                  defaultChecked={status === "1" ? true : false} 
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
                  <Button type="primary">
                    <Link to={{pathname:"/index/department/add",state:{id:rowData.id}}}>编辑</Link>
                  </Button>
                  <Button type="danger" onClick={()=>this.delete(rowData.id)}>删除</Button>
                </div>
              )
            }
          }
        ]
      },
      // 表数据
      data: []
    };
  };
  /** 生命周期挂载完成 */
  componentDidMount(){

  }
  // 获取子组件实例
  getChildRef = (ref) => {
    this.tableComponent = ref; // 存储子组件
  }
  // 禁启用
  onHandlerSwitch(data){
    if(!data){return false}
    // console.log(typeof data.status)
    let statusData = {
      id: data.id,
      status: data.status === "1" ? false : true
    }
    this.setState({id:data.id})
    // console.log(JSON.stringify(statusData))
    departmentStatus(statusData).then(res => {
      message.success(res.data.message);
      this.setState({id:""})
    }).catch(error => {
      this.setState({id:""})
    })
  }
  /** 删除 */
  delete = (id) => {
    this.tableComponent.onHandlerDelete(id)
  }

  render(){
    return(
        <Fragment>
            <TableComponent onRef={this.getChildRef} batchButton={true} config={this.state.tableConfig} />
        </Fragment>
    )
  }
}

export default DepartmentList;
