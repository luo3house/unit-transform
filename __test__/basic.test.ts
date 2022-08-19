import createUnitTransfer from '../src'

test('c2f', () => {
  const units = createUnitTransfer({ scale: 0, unit: 'c' })
  expect(units.c2f(10)).toBe(50)
  expect(units.cf2f(10)).toBe(50)
})

test('f2c', () => {
  const units = createUnitTransfer({ scale: 0, unit: 'f' })
  // 106.66666 -> scale(0) -> 106
  expect(units.f2c(224)).toBe(106)
  expect(units.cf2c(224)).toBe(106)
})
