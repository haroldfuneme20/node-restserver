const { usuarioIngresado } = require("../../jasmine-test/boolean-test");

describe('Pruebas de booleanos', () => {
    it('Debe de regresar true', () => {
        const resp = usuarioIngresado();

        expect(resp).toBeTrue();
    });
});