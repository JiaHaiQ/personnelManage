import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
// antd
import { Button, Switch, message } from 'antd';
// api
import { jobStatus } from "@api/job";
// 组件
import TableComponent from '@c/tableData/Index';
class DepartmentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 搜索参数
      pageNumber: 1,
      pageSize: 10,
      keyWord: "",
      // 表格加载
      loadingTable: false,
      id: "",
      // table配置
      tableConfig: {
        url: "jobList",
        checkbox: true,
        thead: [
          { title: "职位名称", dataIndex: "jobName", key: "jobName" },
          { title: "部门名称", dataIndex: "name", key: "name" },
          {
            title: "禁启用",
            dataIndex: "status",
            key: "status",
            render: (status, rowData) => {
              return (
                <Switch
                  loading={rowData.jobId === this.state.id}
                  checkedChildren="启用"
                  unCheckedChildren="禁用"
                  defaultChecked={status}
                  onChange={() => this.onHandlerSwitch(rowData)}
                />
              )
            }
          },
          {
            title: "操作",
            dataIndex: "open",
            key: "open",
            width: 215,
            render: (text, rowData) => {
              return (
                <div className="inline-button">
                  <Button type="primary">
                    <Link to={{ pathname: "/index/job/add", state: { id: rowData.jobId } }}>编辑</Link>
                  </Button>
                  <Button type="danger" onClick={() => this.delete(rowData.jobId)}>删除</Button>
                </div>
              )
            }
          }
        ],
        // form配置
        formItem: [
          {
            type: "Input",
            label: "部门名称",
            name: "name",
            placeholder: "请输入部门名称"
          }
        ],
      },
      // 表数据
      data: []
    };
  };
  /** 生命周期挂载完成 */
  componentDidMount() {

  }
  // 获取子组件实例
  getChildRef = (ref) => {
    this.tableComponent = ref; // 存储子组件
  }
  // 禁启用
  onHandlerSwitch(data) {
    let statusData = {
      id: data.jobId,
      status: !data.status
    }
    this.setState({ id: data.jobId })
    jobStatus(statusData).then(res => {
      message.success(res.data.message);
      this.setState({ id: "" })
    }).catch(error => {
      this.setState({ id: "" })
    })
  }
  /** 删除 */
  delete = (id) => {
    this.tableComponent.onHandlerDelete(id)
  }

  render() {
    return (
      <Fragment>
        <TableComponent onRef={this.getChildRef} batchButton={true} config={this.state.tableConfig} />
      </Fragment>
    )
  }
}

export default DepartmentList;