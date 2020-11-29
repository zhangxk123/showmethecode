/**
 * @description 模拟轮询，如果成功返回结果。失败则按照时间间隔进行轮询请求
 * @param {*} req 请求接口
 * @param {number} [ms=1000] 第一次失败请求间隔1s
 * @param {number} [step = 1.5] 间隔时间倍数 1.5
 * @return {*}
 */
function poll(req, ms = 1000, step = 1.5) {
  let timer = null;
  const res = req();
  if (res) {
    clearTimeout(timer);
    return;
  }
  timer = setTimeout(() => {
    poll(req, ms * step);
  }, ms);
}