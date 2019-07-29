/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Grid, Card } from '@alifd/next';
import { getQueryString, getNowTimeStamp } from '../../utils/utils';
import './UserLogin.scss';

const { Row, Col } = Grid;

export default class UserLogin extends Component {
  componentDidMount() {
    localStorage.clear();
    sessionStorage.clear();
    //这里判断是否是扫码过来的
    let token = getQueryString(this.props.location.search, 'token');
    let expires_in = getQueryString(this.props.location.search, 'expires_in');
    let bindPhone = getQueryString(this.props.location.search, 'need_phone_verified');
    if (getQueryString(this.props.location.search, 'need_bind_app')) {
      sessionStorage.setItem('needBindAppMsg', getQueryString(this.props.location.search, 'message'));
    }
    if (token && token != null && token != 'undefined' && token != '') {
      localStorage.setItem('lw_token', token);
      localStorage.setItem('lw_expires_in', expires_in);
      localStorage.setItem('lw_login_time', getNowTimeStamp());
      this.props.history.push('/user/loading');
    }
  }

  render() {
    return (
      <div className="login">
        <div className="lw-flex-center">
          <div>
            <Row>
              <Col span="24">
                <div className="login_title">工单系统</div>
                <div className="login_small_title">&nbsp;</div>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <div className="login_left">
                  <img src="https://cdn-static.coldyun.net/images/ccrp/yimiaolian_login_bg.png" alt=""/>
                </div>
              </Col>
              <Col span="12">
                <Card className="login_card" contentHeight="auto">
                  <b className="fonSize18">
                    <img
                      src="https://open.weixin.qq.com/zh_CN/htmledition/res/assets/res-design-download/icon16_wx_logo.png"/> 欢迎登陆
                  </b>
                  <iframe src={'https://we.coldyun.net/we/qrcode/' + Base64.encode(window.location.href)}
                          frameBorder="0" height="340" className="iframe"
                          sandbox="allow-scripts allow-top-navigation allow-same-origin"></iframe>
                </Card>
              </Col>
            </Row>
          </div>
          <div className="login_footer">
            技术支持：冷王科技 | 版本：1.19.0325.16
          </div>
        </div>
      </div>
    );
  }
}
