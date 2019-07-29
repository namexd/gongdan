/* eslint no-unused-expressions: 0 */
import React, { Component } from 'react';
import { Dialog, Form } from '@alifd/next';
import DialogDecorator from './DialogDecorator';
import IceContainer from '@icedesign/container';


class FormDialog extends Component {
  static displayName = 'DetailTable';
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
      value: props.value,
    };

  }
  onOkHandler = () => {
    this.props.onOk();
  };

  render() {
      return (

        <Dialog
          onClose={this.props.onClose}
          onCancel={this.props.onCancel}
          afterClose={this.props.afterClose}
          onOk={this.onOkHandler}
          visible={this.state.visible}
          style={{ width: '50%' }}
          closeable='true'
        >
            <div className="grouped-form">
              <IceContainer title="变更单详情" style={styles.container}>
                  <div>
                    <ul style={styles.detailTable}>
                      <li style={styles.detailItem}>
                        <div style={styles.detailTitle}>编号：</div>
                        <div style={styles.detailBody}>{this.state.value.id}</div>
                      </li>
                      <li style={styles.detailItem}>
                        <div style={styles.detailTitle}>单位：</div>
                        <div style={styles.detailBody}>{this.state.value.company}</div>
                      </li>
                      <li style={styles.detailItem}>
                        <div style={styles.detailTitle}>申请人：</div>
                        <div style={styles.detailBody}>{this.state.value.user_name}</div>
                      </li>
                      <li style={styles.detailItem}>
                        <div style={styles.detailTitle}>联系电话 ：</div>
                        <div style={styles.detailBody}>
                          <span style={styles.statusProcessing}>{this.state.value.phone}</span>
                        </div>
                      </li>
                      <li style={styles.detailItem}>
                        <div style={styles.detailTitle}>申请时间：</div>
                        <div style={styles.detailBody}>
                         {this.state.value.apply_time}
                        </div>
                      </li>
                      <li style={styles.detailItem}>
                        <div style={styles.detailTitle}>处理状态：</div>
                        <div style={styles.detailBody}>
                          {this.state.value.status_name}
                        </div>
                      </li>
                      {this.state.value.handler?
                        <li style={styles.detailItem}>
                          <div style={styles.detailTitle}>处理人：</div>
                          <div style={styles.detailBody}>
                            {this.state.value.handler}
                          </div>
                        </li>

                        :""}
                      {this.state.value.end_time?
                        <li style={styles.detailItem}>
                          <div style={styles.detailTitle}>处理时间：</div>
                          <div style={styles.detailBody}>
                            {this.state.value.end_time}
                          </div>
                        </li>

                        :""}
                    </ul>
                    <div style={styles.subForm}>
                      <h3 style={styles.formTitle}>变更概述</h3>
                      <div>
                        {this.state.value.details.data.length>0?this.state.value.details.data.map((detail)=>{
                          return (
                            <ul style={styles.detailTable}>
                            <li style={styles.detailItem}>
                              <div style={styles.detailTitle}>变更类型：</div>
                              <div style={styles.detailBody}>{detail.change_type_name}</div>
                            </li>
                            <li style={styles.detailItem}>
                              <div style={styles.detailTitle}>关联冰箱：</div>
                              <div style={styles.detailBody}>{detail.cooler.cooler_name}</div>
                            </li>
                            <li style={styles.detailItem}>
                              <div style={styles.detailTitle}>变更原因：</div>
                              <div style={styles.detailBody}>{detail.reason}</div>
                            </li>
                          </ul>
                          );

                        }):""}

                      </div>
                    </div>
                    {this.state.value.news.length>0?
                    <div style={styles.subForm}>
                      <h3 style={styles.formTitle}>冰箱信息</h3>
                      <div>
                        {this.state.value.news.map((news)=>{
                          return (
                          <ul style={styles.detailTable}>
                          <li style={styles.detailItem}>
                          <div style={styles.detailTitle}>冰箱名称：</div>
                          <div style={styles.detailBody}>{news.cooler_name}</div>
                          </li>
                          <li style={styles.detailItem}>
                          <div style={styles.detailTitle}>免疫规划编号：</div>
                          <div style={styles.detailBody}>{news.country_code}</div>
                          </li>
                          <li style={styles.detailItem}>
                          <div style={styles.detailTitle}>品牌：</div>
                          <div style={styles.detailBody}>{news.cooler_brand}</div>
                          </li>
                          <li style={styles.detailItem}>
                          <div style={styles.detailTitle}>型号：</div>
                          <div style={styles.detailBody}>{news.cooler_model}</div>
                          </li>
                          <li style={styles.detailItem}>
                          <div style={styles.detailTitle}>类型：</div>
                          <div style={styles.detailBody}>{news.cooler_type}</div>
                          </li>
                          <li style={styles.detailItem}>
                          <div style={styles.detailTitle}>容积（冷藏）：</div>
                          <div style={styles.detailBody}>{news.cooler_size}</div>
                          </li>
                          <li style={styles.detailItem}>
                          <div style={styles.detailTitle}>容积（冷冻）：</div>
                          <div style={styles.detailBody}>{news.cooler_size2}</div>
                          </li>
                          <li style={styles.detailItem}>
                          <div style={styles.detailTitle}>启用日期：</div>
                          <div style={styles.detailBody}>{news.cooler_starttime}</div>
                          </li>
                          <li style={styles.detailItem}>
                          <div style={styles.detailTitle}>是否为医用冰箱：</div>
                          <div style={styles.detailBody}>{news.is_medical}</div>
                          </li>
                          </ul>
                          );
                        })}
                      </div>
                    </div> :""}
                  </div>
              </IceContainer>
            </div>

        </Dialog>

      );


  }
}

const styles = {
  container: {
    paddingBottom: 0,
  },
  row: {
    marginTop: '10px',
  },
  label: {
    lineHeight: '30px',
  },
  formField: {
    width: '100%',
    color: '#000000',
  },
  subForm: {
    marginBottom: '20px',
    color: '#000000',
  },
  formTitle: {
    margin: '0 0 20px',
    paddingBottom: '10px',
    fontSize: '14px',
  },
  formItem: {
    height: '28px',
    lineHeight: '28px',
    marginBottom: '25px',
  },
  formLabel: {
    textAlign: 'right',
  },
  btns: {
    margin: '25px 0',
  },
  resetBtn: {
    marginLeft: '20px',
  },

    detailItem: {
      padding: '15px 0px',
      display: 'flex',
      borderTop: '1px solid #EEEFF3',
    },
    detailTitle: {
      marginRight: '30px',
      textAlign: 'right',
      width: '120px',
      color: '#999999',
    },
    detailBody: {
      flex: 1,
    },
    statusProcessing: {
      color: '#64D874',
    },
};

export default DialogDecorator(FormDialog);
