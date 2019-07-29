import React, { Component } from 'react';
import { Message, Card, Form, Input } from '@alifd/next';
import IceNotification from '@icedesign/notification';
import { getAdoptSystem, putBindUser } from '../../../../api';

const FormItem = Form.Item;
const app_id = '';

export default class VerifySystem extends Component {
  state = {
    adoptBindTips: false,
    code: '',
    second: 60,
    bindPhoneTips: null,
  };

  getAdoptSystemhandle=(values)=>{
    getAdoptSystem()
      .then((res) => {
        if (res.data != '') {
          this.handleSubmit(values, res.data.id);
        } else {
        }
      })
      .catch((err) => {
        IceNotification.open({
          message: '提示',
          description: err.message,
        });
      })
      .finally(() => {
      });
  }

  handleSubmit = (values,app_id) => {
    console.log(values)
    if (values.username && values.password) {
      values['app_id'] = app_id;
      putBindUser(values)
        .then((res) => {
          this.props.bindSystemHandle();
        })
        .catch((err) => {
          IceNotification.open({
            message: '提示',
            description: err.message,
          });
        });
    }
  };

  render() {
    return (
      <div style={{ width: '500px', margin: 'auto' }}>
        {
          this.state.adoptBindTips ? <Message title="错误提示" type="error" style={{ marginBottom: '20px' }}>
            {this.state.bindPhoneTips}
          </Message> : <Message title="错误提示：抱歉，该系统暂未开放绑定功能！" type="error" style={{ marginBottom: '20px' }}>
            {this.state.bindPhoneTips}
          </Message>
        }
        <Card title="绑定：" contentHeight="auto">
          <Form labelTextAlign="left" size="large" labelAlign="inset">
            <FormItem label="账号：" required>
              <Input name="username" trim/>
            </FormItem>
            <FormItem label="密码：" required>
              <Input name="password" trim/>
            </FormItem>
            <FormItem label=" ">
              <Form.Submit style={{ width: '100%' }} type="primary" validate
                           onClick={this.getAdoptSystemhandle}>绑定</Form.Submit>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}
