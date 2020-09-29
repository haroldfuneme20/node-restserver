let chai = require('chai');
let chaiHttp = require('chai-http');

const expect = require('chai').expect;

console.log('ok');

let n = 20;
chai.use(chaiHttp)
const url = 'https://hfuneme-node-restserver.herokuapp.com';
const id = '5f69160558811327039898ad';
const idDelete = '5f69165858811327039898ae'


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
        c
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
            .send({ nombre: 'pepehh', password: '12345' })
            .end(function(err, res) {
                expect(res).to.have.status(200);
                console.log(res.body)
                console.log(err);
                done();
            });
    });


    it('DELETE: borrar por id ', (done) => {
        chai.request(url)
            .delete(`/usuario/${idDelete}`)
            .end(function(err, res) {
                console.log(res.body)
                expect(res).to.have.status(200);
                done();
            });
    });

});