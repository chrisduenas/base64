const request = require('supertest');

let server;

describe('/', () => {
    beforeEach(() => { server = require('../index'); })
    afterEach(() => { server.close(); })

    describe('GET /', () => {
        it('should return Helloworld', async () => {
            const res = await request(server).get('/');
            expect(res.status).toBe(200);
        });
    });
});