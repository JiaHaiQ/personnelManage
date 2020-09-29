import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
// antd
import { Table, Pagination, Row, Col, Button } from 'antd';
/* Table UI组件 */
class TableBasis extends Component {
    render() {
        const { columns, dataSource, total, changePageCurrent, changePageSize, batchButton, handlerDelete, rowSelection, rowkey, loading } = this.props;
        return (
            <Fragment>
                <Table
                    bordered
                    loading={loading}
                    pagination={false}
                    rowKey={rowkey}
                    columns={columns}
                    dataSource={dataSource}
                    rowSelection={rowSelection}
                />
                <div className="spacing-30"></div>
                <Row>
                    <Col span={8}>
                        {batchButton && <Button type="danger" onClick={handlerDelete}>批量删除</Button>}
                    </Col>
                    <Col span={16}>
                        <Pagination
                            className="pull-right"
                            onChange={changePageCurrent}
                            onShowSizeChange={changePageSize}
                            total={total}
                            showSizeChanger
                            showQuickJumper
                            showTotal={total => `共 ${total} 条`}
                        />
                    </Col>
                </Row>
            </Fragment>
        )
    }
}
// 校验数据类型
TableBasis.propTypes = {
    loading: PropTypes.bool,
    columns: PropTypes.array,
    dataSource: PropTypes.array,
    total: PropTypes.number,
    changePageCurrent: PropTypes.func,
    changePageSize: PropTypes.func,
    batchButton: PropTypes.bool,
    handlerDelete: PropTypes.func,
    rowSelection: PropTypes.object,
    rowkey: PropTypes.string,
}
// 默认值
TableBasis.defaultProps = {
    loading: false,
    columns: [],
    dataSource: [],
    total: 0,
    batchButton: true,
    rowkey: "id",
}
export default TableBasis;
