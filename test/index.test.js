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
        let name;

        it('should save if user is valid', async () => {
            name = 'user4';

            const res = await request(server)
                            .post('/user')
                            .send({name});
            
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('id', 4);
            expect(res.body).toHaveProperty('name','user4');
        });

        it('should return 400 if user is less than 3 characters', async () => {
            name = "12";
            const res = await request(server).post('/user').send();
            expect(res.status).toBe(400);
        });

        it('should return 400 if user is more than 20 characters', async() => {
            name = new Array(25).join('a');
            const res = await request(server).post('/user').send({name});
            expect(res.status).toBe(400);
        });
    });

    describe('GET /user/:id', () => {
        let id;

        it('should return 404 if user with given id is not found', async() => {
            id = '';
            const res = await request(server).get('/user/:id').send({id});
            expect(res.status).toBe(404);
        });

        it('should return user by given id', async() => {
            const res = await request(server).get('/user/' + id);
            expect(res.status).toBe(200);
        });
    });

    describe('PUT /user/:id', () => {
        let newId;
        let newName;

        it('should return 404 if id is not valid', async () => {
            newId = 4;
            const res = await request(server)
                            .put('/user/:id')
                            .send({id: newId});

            expect(res.status).toBe(404);
        });

        it('should return 400 if user name is less than 3 characters', async () => {
            newId = '4';
            newName = '12'

            const res = await request(server)
                            .put('/user/' + newId)
                            .send({name: newName});

            expect(newName).toHaveLength(2);
            expect(res.status).toBe(400);
        });

        it('should return 400 if user name is more than 20 characters', async () => {
            newName = new Array(22).join('a');

            const res =  await request(server)
                            .put('/user/' + newId)
                            .send({name: newName});

            expect(newName).toHaveLength(21);
            expect(res.status).toBe(400);
        });

    });

    describe('DELETE /user/:id', () => {
        let user;

        it('should return 404 if id is not valid', async () => {
            id = '';

            const res = await request(server).delete('/user/' + id);

            expect(res.status).toBe(404);
        });

        it('should return the removed user', async () => {
            user = {
                "id" : 1,
                "name" : "user1"
            }

            const res = await request(server).delete('/user/' + user.id);

            expect(res.body).toHaveProperty('id', 1);
            expect(res.body).toHaveProperty('name', 'user1');

        });
    });
});