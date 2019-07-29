import axios from 'axios'
// import myfun from '@/api/getToken.js'

//请求发起拦截器，配置token与请求头
axios.interceptors.request.use(function (config) {
  config.withCredentials = false;
  config.headers.common["Authorization"] = "Bearer " + localStorage.getItem("lw_token");
  // config.headers.common["Authorization"] = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvd2UuY29sZHl1bi5uZXQiLCJpYXQiOjE1NTEyMzg4MTMsImV4cCI6MTU4Mjc3NDgxMywibmJmIjoxNTUxMjM4ODEzLCJqdGkiOiJ2cmg2MWE5NWhkamtXem5DIiwic3ViIjozNywicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.tWgCVzhJXf-UhGEgLtilyxdnSFKgd767fVadgZeaDzs";
  config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 响应拦截器，对错误进行想要进行的处理
axios.interceptors.response.use((response) => {
  // if (localStorage.getItem("user_time") && localStorage.getItem("user_interval")) {
  //     myfun.getNewToken();  //token续命
  // }
  return response;
}, (err) => {
  if (err.response) {
    // console.log(err.response);
    if (err.response.data && err.response.data.status_code) {
      // 未绑定手机 || 未绑定系统
      if (err.response.data.status_code == 456 || err.response.data.status_code == 457) {
        var link = window.location.href.split("#");
        if (link && link[1]) {
          if (link[1] != "/loading") {
            window.location.href = "#/user/loading";
          }
        }
        return Promise.resolve(err.response.data)
      }
      if (err.response.data.errors) {
        let msg = "";
        let errMessage = JSON.parse(JSON.stringify(err.response.data.errors));
        for (let key in errMessage) {
          msg += errMessage[key] + "<br>";
        }
        err.message = msg;
      } else {
        err.message = err.response.data.message;
      }
      if (err.response.data.status_code == 401) {
        window.location.href = "#/user/login";
      }
    } else {
      err.message = "其他错误";
    }
  }
  return Promise.reject(err)
});

export default axios
