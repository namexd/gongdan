import React, {Component} from 'react';
import {TreeSelect} from '@alifd/next';
import {getTreeData} from "../../api"

const TreeNode = TreeSelect.Node;

export default class SelectTree extends Component {
  static displayName = 'SelectTree';

  state = {
    tree_data: [],
    treeDefaultExpandedKeys: ["1"],
  }

  componentDidMount() {
    this.getData();
  }

  spellHandle = (data) => {
    data.forEach((item, index) => {
      item["label"] = item.title;
      item["key"] = item.id.toString();
      item["value"] = item.id;
      if (item.children) {
        this.spellHandle(item.children);
      }
    });
  }

  getData = () => {
    getTreeData().then((res) => {
      this.spellHandle(res.data.data);
      const expandedKeys = [res.data.data[0].key];
      this.setState({tree_data: res.data.data, treeDefaultExpandedKeys: expandedKeys});
    });
  }

  render() {

    return (
      <div>
        <TreeSelect treeDefaultExpandedKeys={this.state.treeDefaultExpandedKeys} showSearch
                    dataSource={this.state.tree_data} onChange={this.props.onChangeHandle} popupStyle={{height:'300px', overflow:'auto' }} style={{width: '100%'}}
                    notFoundContent="未找到"/>
      </div>
    );
  }
}
