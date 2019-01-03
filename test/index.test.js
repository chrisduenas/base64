const request = require('supertest');

describe('/user', () => {
    let server;

    beforeEach(() => { server = require('../index');
    });

    afterEach(() => { server.close(); })

    describe('GET /', () => {
        it('should return all users', async() => {
            const res = await request(server).get('/user');
            expect(res.status).toBe(200);
        })
    })

    describe('POST /', () => {
        let name;

        const exec = async () => {
            return request(server)
                    .post('/user')
                    .send({name});
        }

        it('should save if user is valid', async () => {
            name = 'user4';

            const res = await exec();
            
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('id', 4);
            expect(res.body).toHaveProperty('name','user4');
        });

        it('should return 400 if user is less than 3 characters', async () => {
            name = "12";
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it('should return 400 if user is more than 20 characters', async() => {
            name = new Array(25).join('a');
            const res = await exec();
            expect(res.status).toBe(400);
        });
    });

    describe('GET /:id', () => {
        let id;

        it('should return 404 if user with given id is not found', async() => {
            id = '';
            const res = await request(server).get('/user/:id');
            expect(res.status).toBe(404);
        });

        it('should return user by given id', async() => {
            const res = await request(server).get('/user/' + id);
            expect(res.status).toBe(200);
        });
    });

    describe('PUT /:id', () => {
        let newId;
        let newName;

        const exec = () => {
            return request(server)
                    .put('/user/' + newId)
                    .send({ 
                            id: newId,
                            name: newName
                            });
        }

        beforeEach( async() => {
            newId = 1;
        });

        it('should return 404 if ID is not valid', async () => {
            newId = '';

            const res = await exec();

            expect(res.status).toBe(404);
        });

        it('should return 400 if user name is less than 3 characters', async () => {
            newName = '12'

            const res = await exec();

            expect(newName).toHaveLength(2);
            expect(res.status).toBe(400);
        });

        it('should return 400 if user name is more than 20 characters', async () => {
            newName = new Array(22).join('a');

            const res =  await exec();

            expect(newName).toHaveLength(21);
            expect(res.status).toBe(400);
        });

    });

    describe('DELETE /:id', () => {
        let name;
        let id;
         
        const exec = async () => {
            return await request(server).delete('/user/' + id);
        }

        beforeEach( async() => {
            id = 1,
            name = 'user1'
        });

        it('should return 404 if id is not valid', async () => {
            id = '';

            const res = await exec();

            expect(res.status).toBe(404);
        });

        it('should return the removed user', async () => {
            const res = await exec();

            expect(res.body).toHaveProperty('id', 1);
            expect(res.body).toHaveProperty('name', 'user1');

        });
    });
});