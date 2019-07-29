/* eslint jsx-a11y/no-noninteractive-element-interactions:0 */
import React, {PureComponent} from 'react';
import {Balloon, Icon, Nav} from '@alifd/next';
import IceImg from '@icedesign/img';
import Layout from '@icedesign/layout';
import {withRouter} from 'react-router-dom';
import FoundationSymbol from '@icedesign/foundation-symbol';
import cx from 'classnames';
import {Link} from 'react-router-dom';
import {headerMenuConfig} from '../../../../menuConfig';
import Logo from '../Logo';
import './scss/base.scss';
import {deleteToken} from "../../../../api"

@withRouter
export default class Header extends PureComponent {

  handleSetting = () => {
    this.props.logoutHandle();
    deleteToken().finally(() => {
      this.props.history.replace('/user/login');
    });
  }

  render() {
    const {isMobile, className, style} = this.props;

    return (
      <Layout.Header
        className={cx('ice-design-layout-header', className)}
        style={{...style}}
      >
        <Logo/>

        <div className="ice-design-layout-header-menu">
          {/*Header 菜单项 begin */}
          {headerMenuConfig && headerMenuConfig.length > 0 ? (
            <Nav direction="hoz" selectedKeys={[]}>
              {headerMenuConfig.map((nav, idx) => {
                const linkProps = {};
                if (nav.newWindow) {
                  linkProps.href = nav.path;
                  linkProps.target = '_blank';
                } else if (nav.external) {
                  linkProps.href = nav.path;
                } else {
                  linkProps.to = nav.path;
                }
                return (
                  <Nav.Item key={idx}>
                    {linkProps.to ? (
                      <Link {...linkProps}>
                        {nav.icon ? (
                          <FoundationSymbol type={nav.icon} size="small"/>
                        ) : null}
                        <span className="ice-head-nav-text">{!isMobile ? nav.name : null}</span>
                      </Link>
                    ) : (
                      <a {...linkProps}>
                        {nav.icon ? (
                          <FoundationSymbol type={nav.icon} size="small"/>
                        ) : null}
                        <span className="ice-head-nav-text">{!isMobile ? nav.name : null}</span>
                      </a>
                    )}
                  </Nav.Item>
                );
              })}
            </Nav>
          ) : null}
          {/*Header 菜单项 end */}

          {/* Header 右侧内容块 */}
          <Balloon
            trigger={
              <div className="ice-design-header-userpannel">
                {this.props.user_data && this.props.user_data.headimgurl ?
                  <IceImg
                    height={40}
                    width={40}
                    type="cover"
                    shape="circle"
                    src={this.props.user_data.headimgurl}
                    className="user-avatar"
                  /> : null}
                <div className="user-profile">
                  {this.props.user_data && this.props.user_data.name ?
                    <span className="user-name">{this.props.user_data.name}</span> : null}
                  <br/>
                  <span className="user-department">{this.props.user_data.realname}</span>
                </div>
                <Icon
                  type="arrow-down"
                  size="xxs"
                  className="icon-down"
                />
              </div>
            }
            closable={false}
            className="user-profile-menu"
          >
            <ul>
              <li className="user-profile-menu-item">
                <Link to="/setting/basic">
                  <FoundationSymbol type="repair" size="small"/>
                  设置
                </Link>
              </li>
              <li className="user-profile-menu-item" onClick={this.handleSetting}>
                <FoundationSymbol type="compass" size="small"/>
                退出
              </li>
            </ul>
          </Balloon>
        </div>
      </Layout.Header>
    );
  }
}
