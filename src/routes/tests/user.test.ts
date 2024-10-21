import {createServer} from 'http'
import request from 'supertest';
import server from '../../app';


const newUser = {
  username: 'Nurlan',
  age: 20,
  hobbies: ['Gaming'],
};

const updatedUser = {
  username: 'JaneDoe',
  age: 26,
  hobbies: ['Cooking', 'Cycling'],
};

describe('User API Test', () => {
  let createdUserId: string;

  // 1. Test: Get all users (empty initially)
  it('should return an empty array when there are no users', async () => {
    const res = await request(server).get('/api/users');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  // 2. Test: Create a new user
  it('should create a new user', async () => {
    const res = await request(server).post('/api/users').send(newUser);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.username).toBe(newUser.username);
    expect(res.body.age).toBe(newUser.age);
    expect(res.body.hobbies).toEqual(newUser.hobbies);

    createdUserId = res.body.id;
  });

  it('should return a user by ID', async () => {
    const res = await request(server).get(`/api/users/${createdUserId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', createdUserId);
    expect(res.body.username).toBe(newUser.username);
  });

  // 4. Test: Update the user by ID
  it('should update the user by ID', async () => {
  

    const res = await request(server).put(`/api/users/${createdUserId}`).send(updatedUser);
    expect(res.status).toBe(200);
    expect(res.body.username).toBe('JaneDoe');
    expect(res.body.age).toBe(26);
    expect(res.body.hobbies).toEqual(['Cooking', 'Cycling']);
  });

  it('should delete the user by ID', async () => {
    const res = await request(server).delete(`/api/users/${createdUserId}`);
    expect(res.status).toBe(204);
  });

  it('should return 404 when trying to get the deleted user', async () => {
    const res = await request(server).get(`/api/users/${createdUserId}`);
    expect(res.status).toBe(404);
  });
});