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
app.get('/redis/pelis/likes/:id', (req, res) => {
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

// decremento
app.get('/redis/pelis/dislikes/:id', (req, res) => {
    let id = req.params;
    let idPel = id.id;

    console.log("DECREMENTO");
    console.log(idPel);
    client.set(`user:${idPel}`, String(idPel));
    client.decr(`user:${idPel}:Count`, () => {});


    client.get(`user:${idPel}:Count`, (err, res) => {
        console.log('VOTOS: ');
        console.log(res);
        voto = res;
    })
    return res.status(200).send({
        error: false,
        message: `Peliculas Dislikes`,
        id: idPel,
        countVoto: voto
    })
})


app.get('/redis/usuarios', (req, res) => {

    console.log('respusta');
    console.log(res.params);
    try {
        const usuariosRes = res.params;
        // metodo de redis para traer la data
        client.get("usuariosRes", async(err, usuarioTraido) => {

            // si si esta la data en redis
            if (usuarioTraido) {
                console.log('Encontro data en redis');
                return res.status(200).send({
                        error: false,
                        message: `usuarios tradiso desde cache`,
                        data: JSON.parse(usuarioTraido)
                    })
                    // si no esta la data en redis hacemos la peticion
            } else {
                console.log('No encontro data en redis');
                axios.get(`https://hfuneme-node-restserver.herokuapp.com/usuario`)
                    .then(function(response) {
                        console.log('Respuesta del server');
                        // handle success
                        usuarioTraido = response.data.usuarios;
                        console.log(JSON.stringify(usuarioTraido));


                        // metodo set de redis para guardar data en redis ex es para decir el ttl de la clave
                        client.setex("usuariosRes", 60, JSON.stringify(usuarioTraido));

                        // respuesta de la data desde el servidor 
                        return res.status(200).send({
                            error: false,
                            message: `usuarios tradiso desde server`,
                            data: usuarioTraido
                        })
                    })
                    .catch(function(error) {
                        // handle error
                        console.log(error);
                    });
            }


        })
    } catch (error) {
        console.log(error);
    }
});

module.exports = app;