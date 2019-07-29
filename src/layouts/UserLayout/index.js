import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import routerData from '../../routerConfig';

export default class UserLayout extends Component {
  render() {
    return (
      <div>
        <Switch>
          {routerData.map((item, index) => {
            return item.component ? (
              <Route
                key={index}
                path={item.path}
                component={item.component}
                exact={item.exact}
              />
            ) : null;
          })}

          <Redirect exact from="/user" to="/user/login"/>
        </Switch>
      </div>
    );
  }
}
