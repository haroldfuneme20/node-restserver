const { Jugador } = require("../../jasmine-test/class-test");


describe('Prueba de clase', () => {

    let jugador = new Jugador();

    // beforeEach(() => {
    //     jugador.hp = 100;
    // });
    beforeEach(() => {
        jugador = new Jugador();
    });

    it('Debe retornar 80 de hp si recibe 20 de daño', () => {
        const res = jugador.recibeDanio(20);
        expect(res).toBe(80);
    });

    it('Debe retornar 50 de hp si recibe 50 de daño', () => {
        const res = jugador.recibeDanio(50);
        expect(res).toBe(50);
    });

    it('Debe retornar 0 de hp si recibe 100 de daño', () => {
        const res = jugador.recibeDanio(100);
        expect(res).toBe(0);
    });
});