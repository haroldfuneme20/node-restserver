let chai = require('chai');
let chaiHttp = require('chai-http');

const expect = require('chai').expect;

console.log('ok');



let n = Math.random();
chai.use(chaiHttp)
const url = 'https://hfuneme-node-restserver.herokuapp.com';
const id = '5f73988423dd5b0017fb50bf';


describe('Prueba de CRUD: ', () => {

    it('POST crear: ', (done) => {
        chai.request(url)
            .post('/usuario')
            .send({ nombre: `test${n}`, email: `test${n}@gmail.com`, password: '12345' })
            .end(function(err, res) {
                console.log(res.body);
                expect(res).to.have.status(200)
                done();
            });
    });

    it('POST 404 No existe recurso: ', (done) => {
        chai.request(url)
            .post('/usuarios')
            .send({ nombre: `test${n}`, email: `test${n}@gmail.com`, password: '12345' })
            .end(function(err, res) {
                console.log(res.body)
                expect(res).to.have.status(404);
                done();
            });
    });

    it('GET 200', (done) => {
        chai.request(url)
            .get('/usuario')
            .end(function(err, res) {
                console.log(res.body)
                expect(res).to.have.status(200);
                done();
            });
    });

    it('PUT actualizar harold', (done) => {
        chai.request(url)
            .put(`/usuario/${id}`)
            .send({ nombre: `HaroldEdit${id}`, password: '12345' })
            .end(function(err, res) {
                expect(res).to.have.status(200);
                console.log(res.body)
                console.log(err);
                done();
            });
    });


    it('DELETE: borrar por id ', (done) => {
        chai.request(url)
            .delete(`/usuario/${id}`)
            .end(function(err, res) {
                console.log(res.body)
                expect(res).to.have.status(200);
                done();
            });
    });

});