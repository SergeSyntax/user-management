const request = require('supertest');
const { User } = require('../../models/user');
let server;

describe('/users', () => {
  beforeEach(() => {
    server = require('../../app');
  });
  afterEach(async () => {
    server.close();
    await User.remove({});
  });
  describe('GET /', () => {
    it('should return all users', async () => {
      await User.insertMany([
        {
          id: 1,
          name: 'max',
          email: 'max@gmail.com',
          address: {
            city: 'tel-aviv'
          }
        },
        {
          id: 2,
          name: 'sergway',
          email: 'sergway@gmail.com',
          address: {
            city: 'tel-aviv'
          }
        },
        {
          id: 3,
          name: 'borodov',
          email: 'borodov@gmail.com',
          address: {
            city: 'tel-aviv'
          }
        }
      ]);

      const res = await request(server).get('/users');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(3);
      expect(res.body.some(user => user.name === 'Max')).toBeTruthy();
    });
  });
  describe('GET /:id', () => {
    it('should return a user if valid id is passed', async () => {
      const user = new User({
        id: 2,
        name: 'sergway',
        email: 'sergway@gmail.com',
        address: {
          city: 'tel-aviv'
        }
      });
      user.save();

      const res = await request(server).get(`/users/${user.id}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', user.name);
    });

    it('should return 404 if invalid id is passed', async () => {
      const res = await request(server).get('/users/1');

      expect(res.status).toBe(404);
    });
  });
  describe('POST /', () => {
    it('should return 400 if user miss name property', async () => {
      const res = await request(server)
        .post('/users')
        .send({
          id: 1,
          name: '',
          email: 'max@gmail.com',
          address: {
            city: 'tel-aviv'
          }
        });
      expect(res.status).toBe(400);
    });
    it('should return 400 if user miss email property', async () => {
      const res = await request(server)
        .post('/users')
        .send({
          id: 1,
          name: 'max',
          email: '',
          address: {
            city: 'tel-aviv'
          }
        });
      expect(res.status).toBe(400);
    });
    it('should return 400 if user miss name city', async () => {
      const res = await request(server)
        .post('/users')
        .send({
          id: 1,
          name: 'max',
          email: 'max@gmail.com',
          address: {
            city: ''
          }
        });
      expect(res.status).toBe(400);
    });
    it('should save the user if it is valid', async () => {
      const user1 = new User({
        id: 2,
        name: 'sergway',
        email: 'sergway@gmail.com',
        address: {
          city: 'tel-aviv'
        }
      });
      user1.save();
      const res = await request(server)
        .post('/users/')
        .send({
          name: 'max',
          email: 'max@gmail.com',
          city: 'Haifa'
        });
      const user = await User.findOne();
      console.log(user);
      expect(user).not.toBeNull();
    });
  });
});
