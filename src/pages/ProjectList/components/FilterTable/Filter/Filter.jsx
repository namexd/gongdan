import React, { Component } from 'react';
import { Grid, Select, DatePicker,Icon } from '@alifd/next';

// form binder 详细用法请参见官方文档
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
} from '@icedesign/form-binder';
import SelectTree from '../../../../../components/SelectTree';
import './Filter.scss';
import moment from 'moment';

moment.locale('zh-cn');
const { Row, Col } = Grid;
const { Option } = Select;

export default class Filter extends Component {
  static displayName = 'Filter';
  constructor(props) {
    super(props);
    this.params={};
    this.state = {
      loading: false,
      date_start: null,
      date_end: null,
      endOpen: false,
    };
  }
  searchHandle = () => {
   return this.refs.tree.searchHandle();
  };

  handleChange = (value,data) => {
    this.props.filterTreeChange(value,data)
  };
  disabledStartDate = (date_start) => {
    const { date_end } = this.state;
    if (!date_start || !date_end) {
      return false;
    }
    return date_start.valueOf() > date_end.valueOf();
  };

  disabledEndDate = (date_end) => {
    const { date_start } = this.state;
    if (!date_end || !date_start) {
      return false;
    }
    return date_end.valueOf() <= date_start.valueOf();
  };

  onChange = (stateName, value) => {
    this.setState({
      [stateName]: value
    });
    if (value==null)

      this.params[stateName] ='';
    else
      this.params[stateName] =value.format('YYYY-MM-DD');
    if ((this.params.date_start==''||this.params.date_start) && (this.params.date_end==''||this.params.date_end) ) {
      this.props.setParams({
        start_time:this.params.date_start,
        end_time:this.params.date_end
      });
    }
  };

  onStartChange = (value) => {
    this.onChange('date_start', value);
  };

  onEndChange = value => {
    this.onChange('date_end', value);
  };

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  }

  handleEndOpenChange = (open) => {
    this.setState({ endOpen: open });
  }

  handleChange = (value,data) => {
    this.props.filterTreeChange(value,data)
  };
  setLoading = () => {
    this.setState({ loading: true });
    this.props.exportData();
  }
  resetLoading=()=>{
    this.setState({ loading: false });
  }
  render() {
    const { endOpen } = this.state;

    return (
      <IceFormBinderWrapper
        value={this.props.value}
        onChange={this.props.onChange}
      >
        <div>
          <Row style={styles.formRow}>
            <Col xxs="6" s="4" l="2" style={styles.label}>
              地区
            </Col>
            <Col span="10">
              <div className='lw-select'>
                <SelectTree onChangeHandle={this.handleChange} ref='tree' style={{ width: '100%' }}></SelectTree>
              </div>
            </Col>
          </Row>
          <Row style={styles.formRow}>
            <Col xxs="6" s="4" l="2" style={styles.label}>
              申请日期:
            </Col>
            <Col span="10">
              <DatePicker
                disabledDate={this.disabledStartDate}
                placeholder="开始时间"
                onChange={this.onStartChange}
                onVisibleChange={this.handleStartOpenChange}
              />
              <span style={styles.customSep}>-</span>
              <DatePicker
                disabledDate={this.disabledEndDate}
                placeholder="结束时间"
                onChange={this.onEndChange}
                visible={endOpen}
                onVisibleChange={this.handleEndOpenChange}
              />
            </Col>
          </Row>
          <Row style={styles.formRow}>
            <Col xxs="6" s="4" l="2" style={styles.label}>
              状态:
            </Col>
            <Col span="10">
              <IceFormBinder name="status">
                <Select placeholder="请选择" style={styles.filterTool}>
                  <Option value="-1">全部</Option>
                  <Option value="0">未处理</Option>
                  <Option value="1">处理中</Option>
                  <Option value="2">已处理</Option>
                </Select>
              </IceFormBinder>
            </Col>
          </Row>
        </div>
      </IceFormBinderWrapper>
    );
  }
}

const styles = {
  filterCol: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },

  filterTitle: {
    width: '68px',
    textAlign: 'right',
    marginRight: '12px',
  },

  filterTool: {
    width: '200px',
  },
  label: { lineHeight: '28px', paddingRight: '10px' },
  formRow: {
    marginBottom: '18px',
  },
  customSep:{
    padding:'0 5px'
  }
};
