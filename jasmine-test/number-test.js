function incrementar(numero) {
    if (numero > 100) {
        return 100;
    } else {
        return numero + 1;
    }
}

module.exports = {
    incrementar
};