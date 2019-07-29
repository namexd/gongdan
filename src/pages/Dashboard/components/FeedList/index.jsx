import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import {getEquipmentChangeApply} from "../../../../api";

export default class FeedList extends Component {
  static displayName = 'FeedList';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.params = {
      pagesize: 5
    }
    this.state = {
      dataSource: []
    };
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    getEquipmentChangeApply(this.params).then((res) => {
      this.setState({
        dataSource: res.data.data,
        total: res.data.meta.pagination.total
      });

    })
  }
  renderItem = (item, idx) => {
    return (
      <div className={styles.item} key={idx}>
        <div className={styles.itemRow}>
          <span className={styles.status}>
            {item.user_name} 新增了一个变更单
          </span>
          <span className={styles.status}>{item.apply_time}</span>
        </div>
        <span className={styles.status}>
          所属单位：{item.company}
        </span>
      </div>
    );
  };

  render() {
    const {dataSource} = this.state
    return (
      <div className="feed-list">
        {dataSource.length > 0 ?
          <IceContainer>
            <div className={styles.titleRow}>
              <h2 className={styles.cardTitle}>变更单列表</h2>
              <span className={styles.status}>共{this.state.total}条变更单</span>
            </div>
            {dataSource.map(this.renderItem)}
            <div className={styles.allMessage}>
              <a href="#/project_list">查看全部</a>
            </div>
          </IceContainer>
          : ""}
      </div>
    );
  }
}
