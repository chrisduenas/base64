const request = require('supertest');

describe('/', () => {
    let server;

    beforeEach(() => { server = require('../index');
    });

    afterEach(() => { server.close(); })

    describe('GET /', () => {
        it('should return Helloworld', async () => {
            const res = await request(server).get('/');
            expect(res.status).toBe(200);
        });
    });

    describe('GET /user', () => {
        it('should return all users', async() => {
            const res = await request(server).get('/user');
            expect(res.status).toBe(200);
        })
    })

    describe('POST /user', () => {

        it('should save if user is valid', async () => {
            const res = await request(server)
                            .post('/user')
                            .send({
                                id: 1,
                                name: 'user1'});
            
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('id', 1);
            expect(res.body).toHaveProperty('name','user1');
        });

        it('should not save if user is not valid', async () => {
            user = '';
            const res = await request(server).post('/');
            expect(res.status).toBe(404);
        })
    });
});