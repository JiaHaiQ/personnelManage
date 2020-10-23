import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// antd
import { Table } from 'antd';
/* Table UI组件 */
class TableBasis extends Component {
    render() {
        const { thead } = this.props.config;
        return (
            <Fragment>
                <div className="spacing-30"></div>
                <Table
                    bordered
                    rowKey={this.props.rowKey}
                    columns={thead}
                    dataSource={this.props.list}
                />
                {/* <Row>
                    <Col span={8}>
                        { batchButton && <Button type="danger" onClick={handlerDelete}>批量删除</Button> }
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
                </Row> */}
            </Fragment>
        )
    }
}
// 校验数据类型
TableBasis.propTypes = {
    config: PropTypes.object,
    rowKey: PropTypes.string,
}
// 默认值
TableBasis.defaultProps = {
    config: {},
    rowKey: "id"
}
const mapStateToProps = (state) => {
    return {
        list: state.department.departmentList
    }
}
export default connect(
    mapStateToProps,
    null
)(TableBasis);
