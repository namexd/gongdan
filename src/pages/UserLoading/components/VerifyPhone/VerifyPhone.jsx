import React, { Component } from 'react';
import { Message, Card, Form, Input } from '@alifd/next';
import IceNotification from '@icedesign/notification';
import { getVcode, putVCode } from '../../../../api';

const FormItem = Form.Item;
const back_key = '';

export default class VerifyPhone extends Component {
  state = {
    code: '',
    second: 60,
    bindPhoneTips: null,
  };

  sendCode = (values, errors) => {
    if (errors) {
      return;
    }
    getVcode({ phone: values.phone })
      .then(res => {
        back_key = res.data.key;
      });

    this.setState({
      code: Math.floor(Math.random() * (999999 - 99999 + 1) + 99999),
    });

    setInterval(() => {
      this.setState({
        second: --this.state.second,
      });
    }, 1000);
  };

  handleSubmit = (values) => {
    if (values.realname && values.phone && values.code) {
      values['verification_key'] = back_key;
      putVCode(values)
        .then(res => {
          IceNotification.open({
            description: '绑定成功！',
          });
          this.props.bindPhoneHandle();
        })
        .catch((err) => {
          IceNotification.open({
            description: err.message,
          });
        });
    }
  };

  render() {
    const { code } = this.state;

    return (
      <div style={{ width: '500px', margin: 'auto' }}>
        <Message title="错误提示" type="error" style={{ marginBottom: '20px' }}>
          {this.state.bindPhoneTips}
        </Message>
        <Card title="绑定手机号：" contentHeight="auto">
          <Form labelTextAlign="left" size="large" labelAlign="inset">
            <FormItem label="姓名：" required>
              <Input name="realname" trim/>
            </FormItem>
            <FormItem label="手机号码：" format="tel" required asterisk={false}>
              <Input name="phone" trim innerAfter={
                <Form.Submit
                  text
                  type="primary"
                  disabled={!!code}
                  validate={['phone']}
                  onClick={this.sendCode}
                  style={{ marginRight: 10 }}
                >
                  {code ? `请等待 ${this.state.second}s` : '发送验证码'}
                </Form.Submit>
              }/>
            </FormItem>
            <FormItem label="验证码：" required asterisk={false}>
              <Input name="verification_code" trim/>
            </FormItem>
            <FormItem label=" ">
              <Form.Submit style={{ width: '100%' }} type="primary" validate
                           onClick={this.handleSubmit}>确认</Form.Submit>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}
