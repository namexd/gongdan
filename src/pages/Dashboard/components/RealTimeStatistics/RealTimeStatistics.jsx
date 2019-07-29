import React, { Component } from 'react';
import { Grid } from '@alifd/next';
import styles from './index.module.scss';

const { Row, Col } = Grid;

export default class RealTimeStatistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:true
    };
  }
  renderData=(data)=>{
    this.setState(data);
  }
  render() {
    const dataSource = this.state;
    return (
      <Row wrap gutter="20">
        <Col xxs="24" s="12" l="6">
          <div className={styles.itemBody1}>
            <div className={styles.itemTitle}>
              <p className={styles.titleText}>工单总数</p>
              <span className={styles.tag}>实时</span>
            </div>
            <div className={styles.itemContent}>
              <h2 className={styles.itemNum}>{dataSource.count}</h2>
              <div className={styles.itemMeta}>
                <p className={styles.total}>{dataSource.count}</p>
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
              <h2 className={styles.itemNum}>{dataSource.handling}</h2>
              <div className={styles.itemMeta}>
                <p className={styles.total}>{dataSource.handling}</p>
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
              <h2 className={styles.itemNum}>{dataSource.handled}</h2>
              <div className={styles.itemMeta}>
                <p className={styles.total}>{dataSource.handled}</p>
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
              <h2 className={styles.itemNum}>{dataSource.unhandled}</h2>
              <div className={styles.itemMeta}>
                <p className={styles.total}>{dataSource.unhandled}</p>
                <p className={styles.desc}>未处理的工单数</p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}
