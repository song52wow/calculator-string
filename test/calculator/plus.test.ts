import { Calculator } from '../../src/calculator'

describe('int + int ', () => {
  it('2 + 2 = 4', () => {
    expect(new Calculator('2').plus('2').result()).toBe('4')
  })

  it('2 + 12 = 14', () => {
    expect(new Calculator('2').plus('12').result()).toBe('14')
  })

  it('2 + 123 = 125', () => {
    expect(new Calculator('2').plus('123').result()).toBe('125')
  })

  it('12 + 12 = 24', () => {
    expect(new Calculator('12').plus('12').result()).toBe('24')
  })

  it('123 + 123 = 246', () => {
    expect(new Calculator('123').plus('123').result()).toBe('246')
  })

  it('1234 + 1234 = 2468', () => {
    expect(new Calculator('1234').plus('1234').result()).toBe('2468')
  })
})

describe('int + float ', () => {
  it('2 + 0.2 = 2.2', () => {
    expect(new Calculator('2').plus('0.2').result()).toBe('2.2')
  })

  it('12 + 0.02 = 12.02', () => {
    expect(new Calculator('12').plus('0.02').result()).toBe('12.02')
  })

  it('123 + 0.008 = 123.008', () => {
    expect(new Calculator('123').plus('0.008').result()).toBe('123.008')
  })

  it('1234 + 0.0005 = 1234.0005', () => {
    expect(new Calculator('1234').plus('0.0005').result()).toBe('1234.0005')
  })

  it('12345 + 0.01006 = 12345.01006', () => {
    expect(new Calculator('12345').plus('0.01006').result()).toBe('12345.01006')
  })

  it('123456 + 0.12345678 = 123456.12345678', () => {
    expect(new Calculator('123456').plus('0.12345678').result()).toBe('123456.12345678')
  })

  it('999999999999999 + 100000123.123123123123 = 1000000100000122.123123123123', () => {
    expect(new Calculator('999999999999999').plus('100000123.123123123123').result()).toBe('1000000100000122.123123123123')
  })
})

describe('float + int ', () => {
  it('0.2 + 2 = 2.2', () => {
    expect(new Calculator('0.2').plus('2').result()).toBe('2.2')
  })

  it('0.02 + 12 = 12.02', () => {
    expect(new Calculator('0.02').plus('12').result()).toBe('12.02')
  })

  it('0.008 + 123 = 123.008', () => {
    expect(new Calculator('0.008').plus('123').result()).toBe('123.008')
  })

  it('0.0005 + 1234 = 1234.0005', () => {
    expect(new Calculator('0.0005').plus('1234').result()).toBe('1234.0005')
  })

  it('0.01006 + 12345 = 12345.01006', () => {
    expect(new Calculator('0.01006').plus('12345').result()).toBe('12345.01006')
  })

  it('0.12345678 + 123456 = 123456.12345678', () => {
    expect(new Calculator('0.12345678').plus('123456').result()).toBe('123456.12345678')
  })
})

describe('float + float ', () => {
  it('0.2 + 0.2 = 0.4', () => {
    expect(new Calculator('0.2').plus('0.2').result()).toBe('0.4')
  })

  it('0.02 + 0.12 = 0.14', () => {
    expect(new Calculator('0.02').plus('0.12').result()).toBe('0.14')
  })

  it('0.008 + 0.123 = 0.131', () => {
    expect(new Calculator('0.008').plus('0.123').result()).toBe('0.131')
  })

  it('0.0005 + 0.1234 = 0.1239', () => {
    expect(new Calculator('0.0005').plus('0.1234').result()).toBe('0.1239')
  })

  it('0.01006 + 0.12345 = 0.13351', () => {
    expect(new Calculator('0.01006').plus('0.12345').result()).toBe('0.13351')
  })

  it('0.12345678 + 0.123456 = 0.24691278', () => {
    expect(new Calculator('0.12345678').plus('0.123456').result()).toBe('0.24691278')
  })


  it('0.000123456780000 + 0.1234560000 = 0.12357945678', () => {
    expect(new Calculator('0.000123456780000').plus('0.1234560000').result()).toBe('0.12357945678')
  })
  
  it('0.000000000000001234 + 0.000000000056543456 = 0.00000000005654469', () => {
    expect(new Calculator('0.000000000000001234').plus('0.000000000056543456').result()).toBe('0.00000000005654469')
  })
})
