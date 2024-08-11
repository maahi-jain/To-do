const supertest = require("supertest");
const app = require("./setup");

describe('Auth API', () => {
    let server;
    let request;

    beforeAll(async () => {
        server = app.listen(8082, () => "connected to 8082");
        request = supertest(app);
    });

    afterAll(async () => {
        await server.close();
    })

    it('should register a new user', async () => {
        const res = await request
            .post('/api/user/signUp')
            .send({ username: 'testuser', password: '123456' });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('token');
    });

    it('should not register an existing user', async () => {
        const res = await request
            .post('/api/user/signUp')
            .send({ username: 'testuser', password: '123456' });

        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('User already exists.');
    });

    it('should login an existing user', async () => {
        const res = await request
            .post('/api/user/login')
            .send({ username: 'testuser', password: '123456' });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });

    it('should not login with incorrect credentials', async () => {
        const res = await request
            .post('/api/user/login')
            .send({ username: 'testuser', password: 'wrongpassword' });

        expect(res.statusCode).toEqual(401);
        expect(res.body.message).toEqual('Invalid credentials.');
    });
});
