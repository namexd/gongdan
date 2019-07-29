/* eslint no-underscore-dangle: 0 */
import React, {Component} from 'react';
import {Table, Message, Loading, Pagination} from '@alifd/next';
import IceContainer from '@icedesign/container';
import FilterForm from './Filter';
import {getEquipmentChangeApply} from "../../../../api";
import {getApplyDetail} from "../../../../api";
import EditorInfoDialog from './EditorInfoDialog';

const stateColors = {
  0: '#ff7675',
  1: '#fdcb6e',
  2: '#2ecc71',
};
export default class EnhanceTable extends Component {
  constructor(props) {
    super(props);
    this.params = {};
    this.state = {
      dataList: [],
      loading: true,
      parent_company: '',
      pager: {total: 1, pageSize: 1},
    };
  }

  getData = () => {
    this.setState({loading: true});
    getEquipmentChangeApply(this.params)
      .then((res) => {
        this.setState({
          dataList: res.data.data,
          pager: {total: res.data.meta.pagination.total, pageSize: res.data.meta.pagination.per_page},
        });
      })
      .finally(() => {
        this.setState({loading: false});
      });
  };

  componentWillMount() {
    this.getData();
  }

  filterFormChange = (value, data) => {
    if (value.status == "-1") {
      delete this.params.status;
    } else {
      this.params.status = value.status;

    }
    this.params.page = 1;
    this.getData();
  };

  filterTreeChange = (value, data) => {
    this.params.company_id = value;
    this.setState({parent_company: data.label});
    this.params.page = 1;
    this.getData();
  };
  renderOperations = (value, index, record) => {
    return (
      <div style={styles.complexTabTableOperation}>
        <a
          href="#"
          style={styles.operation}
          target="_blank"
          onClick={this.editItem.bind(this, record)}
        >
          查看详情
        </a>
      </div>
    );
  };
  renderStatus = (value, index, record) => {
    return (
      <span className={styles.purchasesState} style={{color: stateColors[record.status]}}>
        {record.status_name}
      </span>
    );
  };
  changePage = (currentPage) => {
    this.params.page = currentPage;

    this.getData();
  };
  setParams = (obj) => {
    Object.keys(obj).forEach((key) => {
      this.params[key]=obj[key];
    });
    this.getData();
  };

  editItem = (record, e) => {
    e.preventDefault();
    getApplyDetail(record.id)
      .then((response) => {
        EditorInfoDialog.show({
          value: response.data,
          onOk: () => {
            EditorInfoDialog.hide();
          },
          onClose: () => {
            EditorInfoDialog.hide();
          },
          onCancel: () => {
            EditorInfoDialog.hide();
          },
        });
      });

  };

  render() {
    return (
      <div className="filter-table">
        <Loading style={{width: '100%'}} visible={this.state.loading}>

          <IceContainer title="冷链变更单列表">
            <FilterForm
              ref='filter'
              onChange={this.filterFormChange}
              filterTreeChange={this.filterTreeChange}
              setParams={this.setParams}
              exportData={this.exportData}

            />
          </IceContainer>
          <IceContainer>
            <Table
              dataSource={this.state.dataList}
              className="basic-table"
              style={styles.basicTable}
              hasBorder={false}
            >
              <Table.Column
                title="编号"
                dataIndex="id"
                width={50}
              />
              <Table.Column
                title="单位"
                dataIndex="company"
                width={85}/>
              <Table.Column
                width={80}
                title='申请人'
                dataIndex="user_name"
              />
              <Table.Column
                width={80}
                title='联系电话'
                dataIndex="phone"
              />
              <Table.Column
                width={80}
                title='申请时间'
                dataIndex="apply_time"
              />
              <Table.Column
                width={50}
                title='处理状态'
                cell={this.renderStatus}
              />
              <Table.Column
                title="操作"
                dataIndex="operation"
                width={60}
                cell={this.renderOperations}
              />
            </Table>
            <div style={styles.pagination}>
              <Pagination onChange={this.changePage} totalRender={total => `总计: ${total}条`}
                          current={this.params.page} pageSize={this.state.pager.pageSize}
                          total={this.state.pager.total}/>
            </div>

          </IceContainer>
        </Loading>
      </div>
    );
  }
}

const styles = {
  filterTableOperation: {
    lineHeight: '28px',
  },
  operationItem: {
    marginRight: '12px',
    textDecoration: 'none',
    color: '#5485F7',
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    marginLeft: '10px',
    lineHeight: '20px',
  },
  paginationWrapper: {
    textAlign: 'right',
    paddingTop: '26px',
  },
  pagination: {
    padding: '5px',
    float: 'right'
  },
  purchasesState: {
    textTransform: 'capitalize'
  }
};
