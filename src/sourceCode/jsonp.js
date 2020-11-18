// 实现jsonp
// @url 请求路径
// @params 请求参数
// @callback 回调函数名称
export default function jsonp({ url, params, callback }) {
  // 构建参数
  let querystring = url.includes("?") ? "" : "?";
  const jsonpCallbackName = 'jsonpCallback123';// 这里一般用随机数,避免与原有页面的函数重名
  const query = { ...params, callback: jsonpCallbackName };
  // 拼接src
  querystring += `${Object.keys(query).reduce((a, b) => `${a}${b}=${query[b]}&`, "")}`;
  // 构建请求
  const scriptNode = document.createElement("script");
  window[jsonpCallbackName] = function (params) {
    callback(params);
    document.getElementsByTagName("head")[0].removeChild(scriptNode);
  };
  // 发起请求
  scriptNode.src = url + querystring;
  document.getElementsByTagName("head")[0].appendChild(scriptNode);
}
