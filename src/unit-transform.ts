import { formatDecimal } from './utils'

type TransformOptions = {
  /**
   * 端点传输倍数，即保留N位小数
   * @example 端点值 56，传输倍数 0，则界面应显示 56
   * @example 端点值 103，传输倍数 1，则界面应显示 10.3
   */
  scale?: number
  /**
   * 温标
   */
  unit: 'c' | 'f'
}

export function createUnitTransform(options: TransformOptions) {
  const scale = options.scale ?? 0
  const unit = options.unit
  const transform = {
    formatScale: (anyTemp: number) => formatDecimal(anyTemp, scale),
    isC: () => unit === 'c',
    isF: () => unit === 'f',
    c2val: (c: number) => Math.floor(transform.formatScale(c) * 10 ** scale),
    val2c: (c: number | any) =>
      transform.formatScale(
        parseFloat(`${parseInt(`${c}`, 10) / 10 ** scale}`)
      ),
    c2f: (c: number) =>
      transform.formatScale(parseFloat(`${parseFloat(`${c * 1.8 + 32}`)}`)),
    f2c: (f: number) =>
      transform.formatScale(parseFloat(`${parseFloat(`${(f - 32) / 1.8}`)}`)),
    val2cf: (val: number) => transform.c2cf(transform.val2c(val)),
    c2cf: (c: number) =>
      unit === 'c' ? transform.formatScale(c) : transform.c2f(c),
    f2cf: (f: number) =>
      unit === 'f' ? transform.formatScale(f) : transform.f2c(f),
    cf2c: (cORf: number) =>
      unit === 'c' ? transform.formatScale(cORf) : transform.f2c(cORf),
    cf2f: (cORf: number) =>
      unit === 'f' ? transform.formatScale(cORf) : transform.c2f(cORf),
    cf2val: (cORf: number) =>
      unit === 'c'
        ? transform.c2val(cORf)
        : transform.c2val(transform.f2c(cORf)),
    tempUnitString: () => (unit === 'c' ? '℃' : '℉'),
    displayTempByC: (c: number) =>
      `${transform.c2cf(c)} ${transform.tempUnitString()}`,
    displayTempByVal: (val: number) =>
      transform.displayTempByC(transform.val2c(val)),
  }
  return transform
}
