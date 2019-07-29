import React, {Component} from 'react';
import {Grid, Loading} from '@alifd/next';
import IceContainer from '@icedesign/container';
import {Chart, Axis, Geom, Tooltip} from 'bizcharts';
import styles from './index.module.scss';
import {getApplyStatistics} from "../../../../api";


const {Row, Col} = Grid;


export default class DataStatistics extends Component {
  static displayName = 'DataStatistics';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      total_data: null,
      month_data: null,
      today_data: null
    }
  }

  componentWillMount() {
    this.getData();
  }

  getData = () => {
    this.setState({loading: true});
    getApplyStatistics().then((res) => {
      this.setState({total_data: res.data.total, month_data: res.data.month_counter, today_data: res.data.today})
    }).finally(() => {
      this.setState({
        loading: false
      })
    })

  }

  render() {
    const cols = {
      users: {tickInterval: 20},
    };
    const tooltipCfg = {
      itemTpl: '<li data-index={index}>'
        + '<span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>'
        + '工单数: {value}'
        + '</li>'
    };
    return (
      <div>
        <Loading style={{width: '100%'}} visible={this.state.loading}>
          {this.state.total_data ?
            <IceContainer>
              <Row wrap gutter="20">
                <Col xxs="24" s="12" l="6">
                  <div className={styles.itemBody1}>
                    <div className={styles.itemTitle}>
                      <p className={styles.titleText}>工单总数</p>
                      <span className={styles.tag}>实时</span>
                    </div>
                    <div className={styles.itemContent}>
                      <h2 className={styles.itemNum}>{this.state.total_data.count}</h2>
                      <div className={styles.itemMeta}>
                        <p className={styles.total}>{this.state.total_data.count}</p>
                        <p className={styles.desc}>工单总记录数</p>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col xxs="24" s="12" l="6">
                  <div className={styles.itemBody2}>
                    <div className={styles.itemTitle}>
                      <p className={styles.titleText}>处理中</p>
                      <span className={styles.tag}>实时</span>
                    </div>
                    <div className={styles.itemContent}>
                      <h2 className={styles.itemNum}>{this.state.total_data.handling}</h2>
                      <div className={styles.itemMeta}>
                        <p className={styles.total}>{this.state.total_data.handling}</p>
                        <p className={styles.desc}>处理中的工单数</p>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col xxs="24" s="12" l="6">
                  <div className={styles.itemBody3}>
                    <div className={styles.itemTitle}>
                      <p className={styles.titleText}>已处理</p>
                      <span className={styles.tag}>实时</span>
                    </div>
                    <div className={styles.itemContent}>
                      <h2 className={styles.itemNum}>{this.state.total_data.handled}</h2>
                      <div className={styles.itemMeta}>
                        <p className={styles.total}>{this.state.total_data.handled}</p>
                        <p className={styles.desc}>已处理的工单数</p>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col xxs="24" s="12" l="6">
                  <div className={styles.itemBody4}>
                    <div className={styles.itemTitle}>
                      <p className={styles.titleText}>未处理工单</p>
                      <span className={styles.tag}>实时</span>
                    </div>
                    <div className={styles.itemContent}>
                      <h2 className={styles.itemNum}>{this.state.total_data.unhandled}</h2>
                      <div className={styles.itemMeta}>
                        <p className={styles.total}>{this.state.total_data.unhandled}</p>
                        <p className={styles.desc}>未处理的工单数</p>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </IceContainer> : ""}
          {this.state.today_data ? <IceContainer>
            <h4 className={styles.title}>最近一年工单数</h4>
            <Row wrap>
              <Col xxs="24" l="16">
                <Chart
                  height={300}
                  padding={[40, 10, 40, 35]}
                  data={this.state.month_data}
                  scale={cols}
                  forceFit
                >
                  <Axis name="month"/>
                  <Axis name="month_counter"/>
                  <Tooltip {...tooltipCfg}/>
                  <Geom type="interval" position="month*month_counter"/>
                </Chart>
              </Col>
              <Col xxs="24" l="8">
                <ul className={styles.items}>

                  <li key='1' className={styles.itemBox}>
                    <div className={styles.itemIcon}>
                    </div>
                    <div className={styles.itemText}>
                      <div className={styles.name}>今日工单总数</div>
                      <div className={styles.value}>{this.state.today_data.count}</div>
                    </div>
                  </li>
                  <li key='2' className={styles.itemBox}>
                    <div className={styles.itemIcon}>
                    </div>
                    <div className={styles.itemText}>
                      <div className={styles.name}>今日未处理工单</div>
                      <div className={styles.value}>{this.state.today_data.unhandled}</div>
                    </div>
                  </li>
                  <li key='3' className={styles.itemBox}>
                    <div className={styles.itemIcon}>
                    </div>
                    <div className={styles.itemText}>
                      <div className={styles.name}>今日处理中工单</div>
                      <div className={styles.value}>{this.state.today_data.handling}</div>
                    </div>
                  </li>
                  <li key='4' className={styles.itemBox}>
                    <div className={styles.itemIcon}>
                    </div>
                    <div className={styles.itemText}>
                      <div className={styles.name}>今日已处理工单</div>
                      <div className={styles.value}>{this.state.today_data.handled}</div>
                    </div>
                  </li>
                </ul>
              </Col>
            </Row>
          </IceContainer> : ""}
        </Loading>
      </div>
    );
  }
}
