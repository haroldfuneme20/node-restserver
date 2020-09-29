class Jugador {

    hp;

    constructor() {
        this.hp = 100;
    }

    recibeDanio(danio) {
        if (danio >= this.hp) {
            this.hp = 0;
        } else {
            this.hp = this.hp - danio;
        }

        return this.hp;
    }

}

module.exports = {
    Jugador
}