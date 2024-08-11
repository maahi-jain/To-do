const app = require("./setup");
const mongoose = require("mongoose");
const superTest = require("supertest");

describe('To-Do API', () => {
    let token;
    let todoId;
    let server;
    let request

    beforeAll(async () => {

        server = app.listen(8081, () => "connected to 8081");
        request = superTest(app);
        // Sign up a user and get a token
        const res = await request.post('/api/user/signUp').send({
            username: 'test@example.com',
            password: 'test@123'
        });
        token = res.body.token;
        console.log(token);
    });

    afterAll(async () => {
        await server.close();
    })

    // Create to do
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
        let objectId = new mongoose.Types.ObjectId()
        const res = await request.get(`/api/todos/${objectId}`)
            .set('Authorization', `${token}`);
        expect(res.statusCode).toEqual(404);
        expect(res.body.message).toEqual('Todo not found.');
    });

    // Updae todo
    it('should update a todo', async () => {
        const res = await request
            .put(`/api/todos/${todoId}`)
            .set('Authorization', `${token}`)
            .send({ title: 'Updated Todo', description: 'This is updated', state: 'completed' });

        expect(res.statusCode).toEqual(200);
        expect(res.body.todo).toHaveProperty('title', 'Updated Todo');
        expect(res.body).toHaveProperty('message', 'Todo updated successfully.')
    });

    //  Delete todo
    it('should delete a todo', async () => {
        const res = await request
            .delete(`/api/todos/${todoId}`)
            .set('Authorization', `${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'To do successfully deleted.');
    });
});
