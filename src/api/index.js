import axios from './axios';

let base = 'https://we.coldyun.net';

//扫码登录，验证用户绑定情况
export async function verificationUser(params) {
  return axios.get(`${base}` + '/api/users/apps/ccrp/check');
}

//登出系统
export async function deleteToken(params) {
  return axios.delete(`${base}` + "/api/authorizations/current");
};

//获取验证码
export async function getVcode(params) {
  return axios.post(`${base}` + '/api/verification_codes', params);
}

//提交验证码，绑定手机号
export async function putVCode(params) {
  return axios.put(`${base}` + '/api/users/verification_codes', params);
}

//获取系统是否可绑定
export async function getAdoptSystem(params) {
  return axios.get(`${base}` + '/api/apps/ccrp');
}

//绑定账号
export async function putBindUser(params) {
  return axios.put(`${base}` + '/api/users/apps', params);
}

//获取单位信息+用户信息+菜单
export async function getMenu(params) {
  return axios.get(`${base}` + '/api/home/ccrp');
}

//请求地图坐标
export async function getMapData(params) {
  let id = '';
  if (params) {
    id = '/' + params;
  }
  return axios.get(`${base}` + '/api/ccrp/companies' + id + '?hidden=admin');
}

//请求单位树
export const getTreeData = params => {
  return axios.get(`${base}` + '/api/ccrp/companies/tree');
};

//请求表格
export const getTableData = params => {
  let id = '';
  if (params) {
    id = '/' + params;
  }
  return axios.get(`${base}` + '/api/ccrp/companies/current' + id);
};

//请求管理评估图表+请求超温预警图表
export async function getChartData(params) {
  return axios.get(`${base}` + '/api/ccrp/companies/stat/' + params);
}
//变更单列表
export async function getEquipmentChangeApply(params) {
  return axios.get(`${base}` + '/api/ccrp/equipment_change_applies',{params});
}
//变更单列表
export async function getApplyDetail(params) {
  return axios.get(`${base}` + '/api/ccrp/equipment_change_applies/'+params+'?include=details.cooler');
}

//变更单统计
export async function getApplyStatistics() {
  return axios.get(`${base}` + '/api/ccrp/equipment_change_apply/statistics');
}
