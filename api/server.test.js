const server = require('./server');
const request = require('supertest');
const db = require('../data/dbConfig');

// Write your tests here
beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

test('sanity', () => {
  expect(true).toBe(true);
});

describe('[POST] /api/auth/register', () => {
  // it('responds if username or password is missing', async () => {
  //   const res = await request(server)
  //     .post('/api/auth/register')
  //     .send({ username: 'test' });
  //   expect(res.status).toBe(400);
  //   expect(res.body.message).toBe('username and password required');
  // });
  // it('responds if username is taken', async () => {
  //   const res = await request(server)
  //     .post('/api/auth/register')
  //     .send({ username: 'admin', password: 'password' });
  //   expect(res.status).toBe(401);
  //   expect(res.body.message).toBe('username taken');
  // });
  // it('on successful responds with newly created user', async () => {
  //   const res = await request(server)
  //     .post('/api/auth/register')
  //     .send({ username: 'test', password: 'test' });
  //   expect(res.status).toBe(201);
  //   expect(res.body).toMatchObject({ id: 2, username: 'test' });
  // });
});

describe('[POST] /api/auth/login', () => {
  // it('responds if username or password missing', async () => {
  //   const res = await request(server)
  //     .post('/api/auth/login')
  //     .send({ username: 'foo' });
  //   expect(res.status).toBe(400);
  //   expect(res.body.message).toBe('username and password required');
  // });
  // it('responds if invalid credentials', async () => {
  //   const res = await request(server)
  //     .post('/api/auth/login')
  //     .send({ username: 'admin', password: '1234' });
  //   expect(res.status).toBe(401);
  //   expect(res.body.message).toBe('invalid credentials');
  // });
});
