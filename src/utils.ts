/** 保留N位小数，不执行四舍五入，保留0位小数=取整 */
export function formatDecimal(dec: number, fixes: number) {
  const scale = Math.pow(10, fixes)
  const atoi = (val: any) => parseInt(`${val}`, 10) || 0
  return atoi(dec * scale) / scale
}
