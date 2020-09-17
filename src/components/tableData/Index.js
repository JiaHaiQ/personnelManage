import React,{ Component, Fragment } from 'react';
import PropTypes from 'prop-types';
// antd
import {  Modal, message } from 'antd';
// api
import { TableList, TableDelete } from "@api/common";
// url
import requestUrl from "@api/requestUrl";
// 组件
import TableBasis from "./Table";
import FormSearch from "../formSearch/Index";
class TableComponent extends Component{
    constructor(){
    super();
    this.state = {
        // 请求参数
        pageNumber: 1, 
        pageSize: 10, 
        searchData: {},
        // loading
        loadingTable: true,
        // 数据
        data: [],
        // 页码
        total: 0,
        // 复选框
        checkboxValue: [],
        // 删除弹框提示
        modalVisible: false,
        modalConfirmLoading: false,
    }
    };
    componentDidMount(){
        this.getAllList();
        // 返回子组件实例
        this.props.onRef(this);
    }
    /** 获取列表 */
    getAllList = () => {
        const {pageNumber, pageSize, searchData } = this.state;
        const requestData = {
            url: requestUrl[this.props.config.url],
            data: { pageNumber, pageSize,}
        }
        // 筛选数据过滤
        if(JSON.stringify(searchData) !== "{}"){
            for(let key in searchData){
                requestData.data[key] = searchData[key]
            }
        }
        TableList(requestData).then(res => {
            const listData = res.data.data;
            if(listData){
                this.setState({
                    data: listData.data,
                    total: listData.total,
                    loadingTable: false
                })
            }
        }).catch(error => {
            this.setState({ loadingTable:false })
        })
    };
    /** 删除 */
    onHandlerDelete(id){
        if(id) { this.setState({ checkboxValue: [id] }); }
        this.setState({ modalVisible: true })
    }
    /** 选择复选框 */ 
    onCheckBox = (checkboxValue) => {
        this.setState({ checkboxValue })
    }
    /** 当前页码 */
    onCurrentPage = (value) => {
        this.setState({
            pageNumber:value
        },() => {
            this.getAllList()
        })
    }
    /** 一页显示条数 */
    onSizePage = (value,page) => {
        this.setState({
            pageNumber: 1,
            pageSize:page
        },() => {
            this.getAllList()
        })
    }
    /** 窗口弹出 */
    modalThen = () => {
        if(this.state.checkboxValue.length === 0) {
            message.warning("请选择需要删除的数据!");
            this.setState({
                modalVisible: false,
                modalConfirmLoading: false,
            })
            return false;
        }
        this.setState({ modalConfirmLoading: true })
        const id = this.state.checkboxValue.join();
        const requestData = {
            url: requestUrl[`${this.props.config.url}Delete`],
            data: { id }
        }
        /** 删除数据 */
        TableDelete(requestData).then(res => {
            message.success(res.data.message);
            this.setState({
                modalVisible: false,
                id: "",
                modalConfirmLoading: false,
                checkboxValue: []
            })
            // 重新加载数据
            this.getAllList()
        })
    };
    /** 搜索 */
    search = (searchData) => {
        this.setState({
            pageNumber: 1,
            pageSize: 10,
            searchData
        },() => {
            this.getAllList()
        })
    }
    render(){
        const { loadingTable, data, total, modalVisible, modalConfirmLoading } = this.state;
        const { thead, checkbox, rowkey, formItem } = this.props.config
        const rowSelection = {
            onChange: this.onCheckBox
        }
        return (
            <Fragment>
                {/* 筛选 */}
                <FormSearch formItem={formItem} search={this.search} /> 
                {/* Table UI组件 */}
                <div className="table-wrap">
                    <TableBasis 
                        loading={loadingTable}
                        rowkey={rowkey}
                        columns={thead} 
                        dataSource={data} 
                        total={total}
                        changePageCurrent={this.onCurrentPage}
                        changePageSize ={this.onSizePage}
                        handlerDelete={()=>this.onHandlerDelete()}
                        rowSelection={checkbox ? rowSelection:null}
                    />
                </div>
                {/* 弹窗提示 */}
                <Modal
                    title="提示"
                    visible={modalVisible}
                    onOk={this.modalThen}
                    onCancel={()=>{this.setState({ modalVisible:false })}}
                    okText="确认"
                    cancelText="取消"
                    confirmLoading={modalConfirmLoading}
                >
                    <p className="text-center">确定删除此信息？<strong className="color-red">删除后无法恢复。</strong></p>
                </Modal>
            </Fragment>
        )
    }
}
// 校验数据类型
TableComponent.propTypes = {
    config: PropTypes.object
}
// 默认值
TableComponent.defaultProps = {
    batchButton: false
}
export default TableComponent;
