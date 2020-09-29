const express = require('express')
const redis = require('redis')
const axios = require('axios'); //sirve para hacer peticiones http


const app = express();
const client = redis.createClient(6379, 'localhost');

// abre el cliente de redis
client.on('error', (error) => {
    console.log(error);
});

// incremento likes
app.get('/elastic/get', (req, res) => {
    let id = req.params;
    let idPel = id.id;

    console.log("INCREMENTO");
    console.log(idPel);
    client.set(`user:${idPel}`, String(idPel));
    client.incr(`user:${idPel}:Count`, () => {});

    client.get(`user:${idPel}:Count`, (err, res) => {
        console.log('VOTOS: ');
        console.log(res);
        voto = res;
    })
    return res.status(200).send({
        error: false,
        message: `Peliculas likes`,
        id: idPel,
        countVoto: voto
    })

})