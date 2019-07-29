//获取url后的参数
function getQueryString(param, name) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  let r = param.substr(1)
    .match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

function getNowTimeStamp() {
  let t = Date.parse(new Date()) / 1000;
  return t;
}

export {getQueryString, getNowTimeStamp};
