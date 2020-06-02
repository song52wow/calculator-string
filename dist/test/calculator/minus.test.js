import { Calculator } from '../../src/calculator';
describe('int - int ', function () {
    it('2 - 2 = 0', function () {
        expect(new Calculator('2').minus('2').result()).toBe('0');
    });
    it('2 - 12 = -10', function () {
        expect(new Calculator('2').minus('12').result()).toBe('-10');
    });
    it('2 - 123 = -121', function () {
        expect(new Calculator('2').minus('123').result()).toBe('-121');
    });
    it('12 - 2 = 10', function () {
        expect(new Calculator('12').minus('2').result()).toBe('10');
    });
    it('123 - 23 = 100', function () {
        expect(new Calculator('123').minus('23').result()).toBe('100');
    });
    it('1234 - 134 = 1100', function () {
        expect(new Calculator('1234').minus('134').result()).toBe('1100');
    });
});
describe('int - float ', function () {
    it('2 - 0.2 = 1.8', function () {
        expect(new Calculator('2').minus('0.2').result()).toBe('1.8');
    });
    it('12 - 0.02 = 11.98', function () {
        expect(new Calculator('12').minus('0.02').result()).toBe('11.98');
    });
    it('123 - 0.008 = 122.992', function () {
        expect(new Calculator('123').minus('0.008').result()).toBe('122.992');
    });
    it('1234 - 0.0005 = 1233.9995', function () {
        expect(new Calculator('1234').minus('0.0005').result()).toBe('1233.9995');
    });
    it('12345 - 0.01006 = 12344.98994', function () {
        expect(new Calculator('12345').minus('0.01006').result()).toBe('12344.98994');
    });
    it('123456 - 0.12345678 = 123455.87654322', function () {
        expect(new Calculator('123456').minus('0.12345678').result()).toBe('123455.87654322');
    });
});
describe('float - int ', function () {
    it('0.2 - 2 = -1.8', function () {
        expect(new Calculator('0.2').minus('2').result()).toBe('-1.8');
    });
    it('0.02 - 12 = -11.98', function () {
        expect(new Calculator('0.02').minus('12').result()).toBe('-11.98');
    });
    it('0.008 - 123 = -122.992', function () {
        expect(new Calculator('0.008').minus('123').result()).toBe('-122.992');
    });
    it('0.0005 - 1234 = -1233.9995', function () {
        expect(new Calculator('0.0005').minus('1234').result()).toBe('-1233.9995');
    });
    it('0.01006 - 12345 = -12344.98994', function () {
        expect(new Calculator('0.01006').minus('12345').result()).toBe('-12344.98994');
    });
    it('0.12345678 - 123456 = -123455.87654322', function () {
        expect(new Calculator('0.12345678').minus('123456').result()).toBe('-123455.87654322');
    });
});
describe('float - float ', function () {
    it('0.2 - 0.2 = 0', function () {
        expect(new Calculator('0.2').minus('0.2').result()).toBe('0');
    });
    it('0.02 - 0.12 = -0.1', function () {
        expect(new Calculator('0.02').minus('0.12').result()).toBe('-0.1');
    });
    it('0.008 - 0.123 = -0.115', function () {
        expect(new Calculator('0.008').minus('0.123').result()).toBe('-0.115');
    });
    it('0.0005 - 0.1234 = -0.1229', function () {
        expect(new Calculator('0.0005').minus('0.1234').result()).toBe('-0.1229');
    });
    it('0.01006 - 0.12345 = -0.11339', function () {
        expect(new Calculator('0.01006').minus('0.12345').result()).toBe('-0.11339');
    });
    it('0.12345678 - 0.123456 = 0.00000078', function () {
        expect(new Calculator('0.12345678').minus('0.123456').result()).toBe('0.00000078');
    });
    it('0.000123456780000 - 0.1234560000 = -0.12333254322', function () {
        expect(new Calculator('0.000123456780000').minus('0.1234560000').result()).toBe('-0.12333254322');
    });
    it('0.000000000000001234 - 0.000000000056543456 = -0.000000000056542222', function () {
        expect(new Calculator('0.000000000000001234').minus('0.000000000056543456').result()).toBe('-0.000000000056542222');
    });
});
