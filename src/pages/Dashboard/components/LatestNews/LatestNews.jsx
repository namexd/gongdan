import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid } from '@alifd/next';
import cx from 'classnames';

import './LatestNews.scss';
import styles from './index.module.scss';
import {getEquipmentChangeApply} from "../../../../api";

const { Row, Col } = Grid;


export default class LatestNews extends Component {
  static displayName = 'LatestNews';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      dataSource:[]
    };
  }
  componentDidMount() {
    this.getData()
  }

  getData=()=>{
    getEquipmentChangeApply().then((res)=>{
      this.setState({
        dataSource:res.data.data
      });

    })
  }
  render() {
    const {dataSource}=this.state;
    return (
      <div className={cx(styles.container, 'latest-news')}>
        <Row wrap gutter="20">
          <Col xxs="24" s="24" l="24">
            {dataSource.length>0?
            <IceContainer className={styles.cardContainer}>
              <h3 className={styles.cardTitle}>

                最新工单

                <a href="#" className={cx(styles.more, 'link')}>
                  更多
                </a>
              </h3>

                <div className={styles.items}>
                  {dataSource.map((item, index) => {
                    return (
                      <a key={index} href="#" className={cx(styles.item, 'link')}>
                        <div className={styles.itemTitle}>申请人:{item.user_name}</div>
                        <div className={styles.itemTime}>申请时间:{item.apply_time}</div>

                      </a>
                    );
                  })}
                </div>
            </IceContainer>:""}
          </Col>
        </Row>
      </div>
    );
  }
}
