/* eslint no-undef:0, no-unused-expressions:0, array-callback-return:0 */
import React, {Component} from 'react';
import {Loading} from '@alifd/next';
import Layout from '@icedesign/layout';
import {withRouter} from 'react-router';
import Header from './components/Header';
import Aside from './components/Aside';
import MainRoutes from './MainRoutes';
import './scss/index.scss';
import {enquire} from 'enquire-js';
import {getMenu} from '../../api';
import store from '../../store';

@withRouter
export default class BasicLayout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user_data: store.getState(),
      menu_data: [],
      loadingEnd: false,
      isScreen: 'isDesktop',
    };
    // 注意需要绑定 this
    this.handleStoreChange = this.handleStoreChange.bind(this);
    // 注册监听store，store变化后调用组件的handleStoreChange方法更新组件的state
    store.subscribe(this.handleStoreChange);
  }

  componentDidMount() {
    this.enquireScreenRegister();
    this.getMenuData();
  }

  // store 变化后,更新组件的 state
  handleStoreChange() {
    this.setState({user_data: store.getState()})
  }

  /**
   * 注册监听屏幕的变化，可根据不同分辨率做对应的处理
   */
  enquireScreenRegister = () => {
    const isMobile = 'screen and (max-width: 720px)';
    const isTablet = 'screen and (min-width: 721px) and (max-width: 1199px)';
    const isDesktop = 'screen and (min-width: 1200px)';

    enquire.register(isMobile, this.enquireScreenHandle('isMobile'));
    enquire.register(isTablet, this.enquireScreenHandle('isTablet'));
    enquire.register(isDesktop, this.enquireScreenHandle('isDesktop'));
  };

  enquireScreenHandle = (type) => {
    const handler = {
      match: () => {
        this.setState({
          isScreen: type,
        });
      },
    };

    return handler;
  };
  getMenuData = () => {
    getMenu()
      .then((res) => {
        const action = {
          type:'user_data',
          value: res.data.meta.user
        }
        store.dispatch(action);
        this.setState({user_data: res.data.meta.user, menu_data: res.data.data.menus, loadingEnd: true});
      });
  }

  logoutHandle = () => {
    this.setState({loadingEnd: false});
  }

  render() {
    const layoutClassName = 'ice-design-layout';
    const isMobile = this.state.isScreen !== 'isDesktop';

    return (
      <div>
        <Loading visible={!this.state.loadingEnd} style={{width: "100%", height: "100vh"}}>
          {this.state.loadingEnd ? <div className={layoutClassName}><Layout>
            <Header user_data={this.state.user_data} logoutHandle={this.logoutHandle}/>
            <Layout.Section scrollable>
              <Layout.Aside>
                <Aside isMobile={isMobile} menu_data={this.state.menu_data}/>
              </Layout.Aside>
              <Layout.Main>
                <MainRoutes menu_data={this.state.menu_data}/>
              </Layout.Main>
            </Layout.Section>
          </Layout></div> : null}
        </Loading>
      </div>
    )
      ;
  }
}
