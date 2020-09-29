const { obtenerRobots } = require("../../jasmine-test/array-test");

describe('Pruebas de arreglos', () => {

    it('Debe de retornar robots', () => {
        const res = obtenerRobots();
        expect(res.length).toBe(3);

    });

    it('Debe de venir un Megaman', () => {
        const res = obtenerRobots();
        expect(res).toContain('Megaman');
        // expect(res).toContain('Ultron');

    });

});