import { Calculator } from '../../src/calculator'

describe('int x int ', () => {
  it('2 x 2 = 4', () => {
    expect(new Calculator('2').multiply('2').result()).toBe('4')
  })

  it('2 x 12 = 24', () => {
    expect(new Calculator('2').multiply('12').result()).toBe('24')
  })

  it('2 x 123 = 246', () => {
    expect(new Calculator('2').multiply('123').result()).toBe('246')
  })

  it('12 x 12 = 4', () => {
    expect(new Calculator('12').multiply('12').result()).toBe('144')
  })

  it('123 x 123 = 15129', () => {
    expect(new Calculator('123').multiply('123').result()).toBe('15129')
  })

  it('1234 x 1234 = 1522756', () => {
    expect(new Calculator('1234').multiply('1234').result()).toBe('1522756')
  })

  // it('123456 x 123456789123456789 = 152345677626', () => {
  //   expect(new Calculator('123456').multiply('123456789123456789').result()).toBe('152345677626')
  // })

  it('1234567891 x 9876543219 = 12193263132251181129', () => {
    expect(new Calculator('1234567891').multiply('9876543219').result()).toBe('12193263132251181129')
  })

  it('123456 x 12345678 = 1524148023168', () => {
    expect(new Calculator('123456').multiply('12345678').result()).toBe('1524148023168')
  })

  it('123456789 x 123456789 = 15241578750190520', () => {
    expect(new Calculator('123456789').multiply('123456789').result()).toBe('15241578750190521')
  })

  it('12332212 x 1000000000000000000 = 12332212000000000000000000', () => {
    expect(new Calculator('12332212').multiply(Math.pow(10, 18).toString()).result()).toBe('12332212000000000000000000')
  })

  it('1233.2212 x 1000000000000000000 = 1233221200000000000000', () => {
    expect(new Calculator('1233.2212').multiply(Math.pow(10, 18).toString()).result()).toBe('1233221200000000000000')
  })
})

describe('int x float ', () => {
  it('2 x 0.2 = 0.4', () => {
    expect(new Calculator('2').multiply('0.2').result()).toBe('0.4')
  })

  it('12 x 0.02 = 24', () => {
    expect(new Calculator('12').multiply('0.02').result()).toBe('0.24')
  })

  it('123 x 0.008 = 0.984', () => {
    expect(new Calculator('123').multiply('0.008').result()).toBe('0.984')
  })

  it('1234 x 0.0005 = 0.617', () => {
    expect(new Calculator('1234').multiply('0.0005').result()).toBe('0.617')
  })

  it('12345 x 0.01006 = 124.1907', () => {
    expect(new Calculator('12345').multiply('0.01006').result()).toBe('124.1907')
  })

  it('123456 x 0.12345678 = 15241.48023168', () => {
    expect(new Calculator('123456').multiply('0.12345678').result()).toBe('15241.48023168')
  })
})

describe('float x int ', () => {
  it('0.2 x 2 = 0.4', () => {
    expect(new Calculator('0.2').multiply('2').result()).toBe('0.4')
  })

  it('0.02 x 12 = 24', () => {
    expect(new Calculator('0.02').multiply('12').result()).toBe('0.24')
  })

  it('0.008 x 123 = 0.984', () => {
    expect(new Calculator('0.008').multiply('123').result()).toBe('0.984')
  })

  it('0.0005 x 1234 = 0.617', () => {
    expect(new Calculator('0.0005').multiply('1234').result()).toBe('0.617')
  })

  it('0.01006 x 12345 = 124.1907', () => {
    expect(new Calculator('0.01006').multiply('12345').result()).toBe('124.1907')
  })

  it('0.12345678 x 123456 = 15241.48023168', () => {
    expect(new Calculator('0.12345678').multiply('123456').result()).toBe('15241.48023168')
  })
})

describe('float x float ', () => {
  it('0.2 x 0.2 = 0.04', () => {
    expect(new Calculator('0.2').multiply('0.2').result()).toBe('0.04')
  })

  it('0.02 x 0.12 = 0.0024', () => {
    expect(new Calculator('0.02').multiply('0.12').result()).toBe('0.0024')
  })

  it('0.008 x 0.123 = 0.000984', () => {
    expect(new Calculator('0.008').multiply('0.123').result()).toBe('0.000984')
  })

  it('0.0005 x 0.1234 = 0.0000617', () => {
    expect(new Calculator('0.0005').multiply('0.1234').result()).toBe('0.0000617')
  })

  it('0.01006 x 0.12345 = 0.001241907', () => {
    expect(new Calculator('0.01006').multiply('0.12345').result()).toBe('0.001241907')
  })

  it('0.12345678 x 0.123456 = 0.01524148023168', () => {
    expect(new Calculator('0.12345678').multiply('0.123456').result()).toBe('0.01524148023168')
  })


  it('0.000123456780000 x 0.1234560000 = 0.00001524148023168', () => {
    expect(new Calculator('0.000123456780000').multiply('0.1234560000').result()).toBe('0.00001524148023168')
  })
  it('0.000000000000001234 x 0.000000000056543456 = 0.000000000000000000000000069774624704', () => {
    expect(new Calculator('0.000000000000001234').multiply('0.000000000056543456').result()).toBe('0.000000000000000000000000069774624704')
  })
  it('0.0002065305 x 3759762.9417227306 = 776.50572023546640200000', () => {
    expect(new Calculator('0.0002065305').multiply('3759762.9417227306').result()).toBe('776.505720235466402')
  })
  it('116200001.8089514361 x 0.0002065305 = 23998.84447360364457345105', () => {
    expect(new Calculator('116200001.8089514361').multiply('0.0002065305').result()).toBe('23998.84447360364457345105')
  })
})
