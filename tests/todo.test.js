require("./setup.js");
const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);
const mongoose = require("mongoose");

describe('To-Do API', () => {
    let token;
    let todoId;

    beforeAll(async () => {
        console.log("To do started");
        console.log("Imported request--", request);
        // Sign up a user and get a token
        const res = await request.post('/api/user/signUp').send({
            username: 'test@example.com',
            password: 'test@123'
        });
        token = res.body.token;
        console.log(token);
    });

    afterAll(async () => {
        app.close();
    })

    it('Create a todo item', async () => {
        const res = await request.post("/api/todos")
            .set('Authorization', `${token}`)
            .send({
                title: "Test title",
                description: "Test data"
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message', 'Todo created successfully.');
        console.log(res.body);
        todoId = res.body.todo;
    });

    // Get all todos
    it('should retrieve all to-do items', async () => {
        const res = await request.get('/api/todos')
            .set('Authorization', `${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.todos).toBeInstanceOf(Array);
        expect(res.body.todos[0]).toHaveProperty('_id', todoId);
    });

    // Get to do By Id
    it('should retrieve a specific to-do item by ID', async () => {
        const res = await request.get(`/api/todos/${todoId}`)
            .set('Authorization', `${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('todo._id', todoId);
    });

    // Get non-exist Todo
    it('should return 404 for a non-existent to-do item', async () => {
        const res = await request.get(`/api/todos/${new mongoose.Types.ObjectId()}`)
            .set('Authorization', `${token}`);
        expect(res.statusCode).toEqual(404);
        expect(res.body.message).toEqual('Todo not found.');
    });

});
