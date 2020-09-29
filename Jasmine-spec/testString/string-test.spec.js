const { prueba } = require("../../jasmine-test/string-test.js");

describe('Pruebas de Strings', () => {

    it(' Debe de regresar un string', () => {
        const respuesta = prueba('harold');
        expect(typeof respuesta).toBe('string');
    });


    it(' Debe de retornar un saludo con el nombre enviado', () => {
        let nombre = 'Juan'
        const respuesta = prueba(nombre);
        expect(respuesta).toContain(nombre);
    });

});