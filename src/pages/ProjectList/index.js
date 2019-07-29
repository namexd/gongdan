import React, { Component } from 'react';
import FilterTable from './components/FilterTable';

export default class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="ccrp-count-cooler-number-page">
        {/* 附带筛选工具条的表格 */}
        <FilterTable />
      </div>
    );
  }
}
