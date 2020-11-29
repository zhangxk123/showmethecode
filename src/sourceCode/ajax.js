/**
 * @description 模拟ajax函数
 * @export
 * @param {*} {
 *   url, method, params, data, headers, success, error
 *  请求路径，请求方法，get请求参数，post请求参数，头信息，成功回调函数，失败回调函数
 * }
 */
export default function ajax({
  url, method, params, data, headers, success, error
}) {
  if (method == "get" && params) {
    let querystring = "?";
    querystring += Object.keys(params).reduce((p, n) => `${p}${n}=${params[n]}&`, "");
    console.log(querystring);
    url += querystring;
  }
  const xhr = new XMLHttpRequest();
  // 成功回调
  xhr.onload = function () {
    // readyState {0,1,2,3,4}
    if (xhr.readyState == 4 || xhr.status == 200) {
      success(xhr.response);
    } else {
      error(xhr.response);
    }
  };
  xhr.onerror = error;
  // 打开一个http请求
  xhr.open(method, url);
  // 设置header
  Object.keys(headers).forEach((h) => xhr.setRequestHeader(h, headers[h]));
  // 发送
  xhr.send(data);
}
