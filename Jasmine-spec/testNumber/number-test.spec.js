const { incrementar } = require("../../jasmine-test/number-test");

describe('Prueba de números: ', () => {

    it('Debe de retornar 100, si el número ingresado es mayor a 100', () => {
        const res = incrementar(300);

        expect(res).toBe(100);
    });

    it('Debe de retornar el numero + 1, si el número ingresado es menor a 100', () => {
        const res = incrementar(50);
        expect(res).toBe(51);
    });
});