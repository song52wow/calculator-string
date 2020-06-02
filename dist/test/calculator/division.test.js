import { Calculator } from '../../src/calculator';
describe('int / int ', function () {
    it('2 / 2 = 1', function () {
        expect(new Calculator('2').division('2').result()).toBe('1');
    });
    it('2 / 12 = 0.166666666666666666666666666666', function () {
        expect(new Calculator('2').division('12').result()).toBe('0.166666666666666666666666666666');
    });
    it('2 / 123 = 0.016260162601626016260162601626', function () {
        expect(new Calculator('2').division('123').result()).toBe('0.016260162601626016260162601626');
    });
    it('12 / 2 = 6', function () {
        expect(new Calculator('12').division('2').result()).toBe('6');
    });
    it('123 / 23 = 5.347826086956521739130434782608', function () {
        expect(new Calculator('123').division('23').result()).toBe('5.347826086956521739130434782608');
    });
    it('1234 / 134 = 9.208955223880597014925373134328', function () {
        expect(new Calculator('1234').division('134').result()).toBe('9.208955223880597014925373134328');
    });
    it('1234 / 1000000000000000000 = 0.000000000000001234', function () {
        expect(new Calculator('1234').division(Math.pow(10, 18).toString()).result()).toBe('0.000000000000001234');
    });
});
describe('int / float ', function () {
    it('2 / 0.2 = 10', function () {
        expect(new Calculator('2').division('0.2').result()).toBe('10');
    });
    it('12 / 0.02 = 600', function () {
        expect(new Calculator('12').division('0.02').result()).toBe('600');
    });
    it('123 / 0.008 = 15375', function () {
        expect(new Calculator('123').division('0.008').result()).toBe('15375');
    });
    it('1234 / 0.0005 = 2468000', function () {
        expect(new Calculator('1234').division('0.0005').result()).toBe('2468000');
    });
    it('12345 / 0.01006 = 1227137.176938369781', function () {
        expect(new Calculator('12345').division('0.01006').result()).toBe('1227137.176938369781312127236580516898');
    });
    it('123456 / 0.12345678 = 999993.6819994819', function () {
        expect(new Calculator('123456').division('0.12345678').result()).toBe('999993.68199948192395751776451645669');
    });
});
describe('float / int ', function () {
    it('0.2 / 2 = 0.1', function () {
        expect(new Calculator('0.2').division('2').result()).toBe('0.1');
    });
    it('0.02 / 12 = 0.00166666666666666666666666666666', function () {
        expect(new Calculator('0.02').division('12').result()).toBe('0.00166666666666666666666666666666');
    });
    it('0.008 / 123 = 0.000065040650406504065040650406504', function () {
        expect(new Calculator('0.008').division('123').result()).toBe('0.000065040650406504065040650406504');
    });
    it('0.0005 / 1234 = 0.0000004051863857374392220421393841', function () {
        expect(new Calculator('0.0005').division('1234').result()).toBe('0.0000004051863857374392220421393841');
    });
    it('0.01006 / 12345 = 0.00000081490481976508707978938841636', function () {
        expect(new Calculator('0.01006').division('12345').result()).toBe('0.00000081490481976508707978938841636');
    });
    it('0.12345678 / 123456 = 0.00000100000631804043545878693623639191', function () {
        expect(new Calculator('0.12345678').division('123456').result()).toBe('0.00000100000631804043545878693623639191');
    });
    it('10.10 / 100 = 0.101', function () {
        expect(new Calculator('10.10').division('100').result()).toBe('0.101');
    });
});
describe('float / float ', function () {
    it('0.2 / 0.2 = 1', function () {
        expect(new Calculator('0.2').division('0.2').result()).toBe('1');
    });
    it('0.02 / 0.12 = 0.166666666666666666666666666666', function () {
        expect(new Calculator('0.02').division('0.12').result()).toBe('0.166666666666666666666666666666');
    });
    it('0.008 / 0.123 = 0.065040650406504065040650406504', function () {
        expect(new Calculator('0.008').division('0.123').result()).toBe('0.065040650406504065040650406504');
    });
    it('0.0005 / 0.1234 = 0.004051863857374392220421393841', function () {
        expect(new Calculator('0.0005').division('0.1234').result()).toBe('0.004051863857374392220421393841');
    });
    it('0.01006 / 0.12345 = 0.081490481976508707978938841636', function () {
        expect(new Calculator('0.01006').division('0.12345').result()).toBe('0.081490481976508707978938841636');
    });
    it('0.12345678 / 0.123456 = 1.00000631804043545878693623639191', function () {
        expect(new Calculator('0.12345678').division('0.123456').result()).toBe('1.00000631804043545878693623639191');
    });
    it('0.000123456780000 / 0.1234560000 = 0.001000006318040435458786936236391912908', function () {
        expect(new Calculator('0.000123456780000').division('0.1234560000').result()).toBe('0.001000006318040435458786936236391912908');
    });
    it('0.000000000000001234 / 0.000000000056543456 = 0.000021823922471240526932064428', function () {
        expect(new Calculator('0.000000000000001234').division('0.000000000056543456').result()).toBe('0.000021823922471240526932064428');
    });
});
