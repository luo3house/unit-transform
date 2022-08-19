import { formatDecimal } from './utils'

type TransferOptions = {
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

export function createUnitTransfer(options: TransferOptions) {
  const scale = options.scale ?? 0
  const unit = options.unit
  const transfer = {
    formatScale: (anyTemp: number) => formatDecimal(anyTemp, scale),
    isC: () => unit === 'c',
    isF: () => unit === 'f',
    c2val: (c: number) => Math.floor(transfer.formatScale(c) * 10 ** scale),
    val2c: (c: number | any) =>
      transfer.formatScale(parseFloat(`${parseInt(`${c}`, 10) / 10 ** scale}`)),
    c2f: (c: number) =>
      transfer.formatScale(parseFloat(`${parseFloat(`${c * 1.8 + 32}`)}`)),
    f2c: (f: number) =>
      transfer.formatScale(parseFloat(`${parseFloat(`${(f - 32) / 1.8}`)}`)),
    val2cf: (val: number) => transfer.c2cf(transfer.val2c(val)),
    c2cf: (c: number) =>
      unit === 'c' ? transfer.formatScale(c) : transfer.c2f(c),
    f2cf: (f: number) =>
      unit === 'f' ? transfer.formatScale(f) : transfer.f2c(f),
    cf2c: (cORf: number) =>
      unit === 'c' ? transfer.formatScale(cORf) : transfer.f2c(cORf),
    cf2f: (cORf: number) =>
      unit === 'f' ? transfer.formatScale(cORf) : transfer.c2f(cORf),
    cf2val: (cORf: number) =>
      unit === 'c' ? transfer.c2val(cORf) : transfer.c2val(transfer.f2c(cORf)),
    tempUnitString: () => (unit === 'c' ? '℃' : '℉'),
    displayTempByC: (c: number) =>
      `${transfer.c2cf(c)} ${transfer.tempUnitString()}`,
    displayTempByVal: (val: number) =>
      transfer.displayTempByC(transfer.val2c(val)),
  }
  return transfer
}
