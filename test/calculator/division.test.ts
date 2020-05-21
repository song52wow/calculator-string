import { Calculator } from '../../src/calculator'

describe('int / int ', () => {
  it('2 / 2 = 1', () => {
    expect(new Calculator('2').division('2').result()).toBe('1')
  })

  it('2 / 12 = 0.16666666666666666', () => {
    expect(new Calculator('2').division('12').result()).toBe('0.16666666666666666')
  })

  it('2 / 123 = 0.016260162601626018', () => {
    expect(new Calculator('2').division('123').result()).toBe('0.016260162601626018')
  })

  it('12 / 2 = 6', () => {
    expect(new Calculator('12').division('2').result()).toBe('6')
  })

  it('123 / 23 = 5.3478260869565215', () => {
    expect(new Calculator('123').division('23').result()).toBe('5.3478260869565215')
  })

  it('1234 / 134 = 9.208955223880597', () => {
    expect(new Calculator('1234').division('134').result()).toBe('9.208955223880597')
  })
})

describe('int / float ', () => {
  it('2 / 0.2 = 10', () => {
    expect(new Calculator('2').division('0.2').result()).toBe('10')
  })

  it('12 / 0.02 = 600', () => {
    expect(new Calculator('12').division('0.02').result()).toBe('600')
  })

  it('123 / 0.008 = 15375', () => {
    expect(new Calculator('123').division('0.008').result()).toBe('15375')
  })

  it('1234 / 0.0005 = 2468000', () => {
    expect(new Calculator('1234').division('0.0005').result()).toBe('2468000')
  })

  it('12345 / 0.01006 = 1227137.1769383', () => {
    expect(new Calculator('12345').division('0.01006').result()).toBe('1227137.1769383')
  })

  it('123456 / 0.12345678 = 999993.6819994819', () => {
    expect(new Calculator('123456').division('0.12345678').result()).toBe('999993.6819994819')
  })
})

describe('float / int ', () => {
  it('0.2 / 2 = 0.1', () => {
    expect(new Calculator('0.2').division('2').result()).toBe('0.1')
  })

  it('0.02 / 12 = 0.0016666666666666668', () => {
    expect(new Calculator('0.02').division('12').result()).toBe('0.0016666666666666668')
  })

  it('0.008 / 123 = 0.00006504065040650407', () => {
    expect(new Calculator('0.008').division('123').result()).toBe('0.00006504065040650407')
  })

  it('0.0005 / 1234 = -1233.9995', () => {
    expect(new Calculator('0.0005').division('1234').result()).toBe('-1233.9995')
  })

  it('0.01006 / 12345 = -12344.98994', () => {
    expect(new Calculator('0.01006').division('12345').result()).toBe('-12344.98994')
  })

  it('0.12345678 / 123456 = -123455.87654322', () => {
    expect(new Calculator('0.12345678').division('123456').result()).toBe('-123455.87654322')
  })
})

describe('float / float ', () => {
  it('0.2 / 0.2 = 1', () => {
    expect(new Calculator('0.2').division('0.2').result()).toBe('0')
  })

  it('0.02 / 0.12 = -0.1', () => {
    expect(new Calculator('0.02').division('0.12').result()).toBe('-0.1')
  })

  it('0.008 / 0.123 = -0.115', () => {
    expect(new Calculator('0.008').division('0.123').result()).toBe('-0.115')
  })

  it('0.0005 / 0.1234 = -0.1229', () => {
    expect(new Calculator('0.0005').division('0.1234').result()).toBe('-0.1229')
  })

  it('0.01006 / 0.12345 = -0.11339', () => {
    expect(new Calculator('0.01006').division('0.12345').result()).toBe('-0.11339')
  })

  it('0.12345678 / 0.123456 = 0.00000078', () => {
    expect(new Calculator('0.12345678').division('0.123456').result()).toBe('0.00000078')
  })


  it('0.000123456780000 / 0.1234560000 = -0.12333254322', () => {
    expect(new Calculator('0.000123456780000').division('0.1234560000').result()).toBe('-0.12333254322')
  })
  
  it('0.000000000000001234 / 0.000000000056543456 = -0.000000000056542222', () => {
    expect(new Calculator('0.000000000000001234').division('0.000000000056543456').result()).toBe('-0.000000000056542222')
  })
})
