/* eslint react/no-string-refs:0 */
import React, {Component} from 'react';
import {Loading} from '@alifd/next';
import VerifyPhone from './components/VerifyPhone';
import VerifySystem from './components/VerifySystem';
import IceNotification from '@icedesign/notification/lib/index';
import {verificationUser} from '../../api';
import {withRouter} from 'react-router';
@withRouter
export default class UserLoading extends Component {
  state = {
    is_bindphone: false,
    is_bindsystem: false,
    bindPhoneTips: null,
    visible: true
  };

  componentDidMount() {
    this.verification();
  }

  verification() {
    verificationUser()
      .then((res) => {
        if (res.status_code == 456) {
          this.setState({is_bindphone: true, is_bindsystem: false, visible: false});
        } else if (res.status_code == 457) {
          this.setState({is_bindphone: false, is_bindsystem: true, visible: false});
        } else {
          localStorage.setItem('adopt', '1');
          IceNotification.open({
            message: '提示',
            description: '登录成功，正在进入系统！',
          });
          setTimeout(() => {
            if (res.data.redirect_url) {
              location.href = res.data.redirect_url;
            } else {
              this.props.history.push('/index');
            }
          }, 1000);
        }
      })
      .catch((err) => {
        IceNotification.open({
          message: '提示',
          description: err.message,
        });
      });
  }

  render() {
    return (
      <div style={{height: '100vh', width: "100%", display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Loading visible={this.state.visible}>
          {this.state.is_bindphone ? <VerifyPhone></VerifyPhone> : null}
          {this.state.is_bindsystem ? <VerifySystem bindSystemHandle={this.verification}></VerifySystem> : null}
        </Loading>
      </div>
    );
  }
}
