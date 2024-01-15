const request = require('supertest');
const bcrypt = require('bcryptjs');
const httpStatus = require('http-status');

const app = require('../../src/app');
const User = require('../../src/models/user.model');
const setupTestDB = require('../utils/setupTestDB');

const password = 'Password123';
const hashedPassword = bcrypt.hashSync(password, 8);

const userOne = {
  "userName": "egieimandha5",
  "emailAddress": "egieimandha5@gmail.com",
  password,
  "identityNumber": 1234567895,
  "accountNumber": 22212345678
};

jest.mock('ioredis', () => jest.requireActual('ioredis-mock'));
setupTestDB();

describe('Auth routes', () => {
  describe('POST /v1/auth/register', () => {
    let newUser = {
      "userName": "egieimandha10",
      "emailAddress": "egieimandha10@gmail.com",
      "password": "Password123",
      "identityNumber": 12345678910
    };

    it('should return 201 and successfully register user if request data is ok', async () => {
      const res = await request(app).post('/v1/auth/register').send(newUser).expect(httpStatus.CREATED);

      expect(res.body.user).toEqual({
        _id: expect.anything(),
        accountNumber: expect.anything(),
        userName: newUser.userName,
        emailAddress: newUser.emailAddress,
        identityNumber: newUser.identityNumber,
        password: expect.anything(),
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
        __v: expect.anything(),
      });

      const dbUser = await User.findById(res.body.user._id);
      expect(dbUser).toBeDefined();
      expect(dbUser.password).not.toBe(newUser.password);

      expect(res.body.token).toEqual(expect.anything());
      expect(res.body.expires).toEqual(expect.anything());
    });
    it('should return 400 error if email is already used', async () => {
      await User.insertMany([{
				...userOne,
				password: hashedPassword
			}]);
      newUser.emailAddress = userOne.emailAddress;

      await request(app).post('/v1/auth/register').send(newUser).expect(httpStatus.BAD_REQUEST);
    });
    it('should return 400 error if password does not contain both letters and numbers', async () => {
      newUser.password = 'password';

      await request(app).post('/v1/auth/register').send(newUser).expect(httpStatus.BAD_REQUEST);

      newUser.password = '11111111';

      await request(app).post('/v1/auth/register').send(newUser).expect(httpStatus.BAD_REQUEST);
    });
  });
	describe('POST /v1/auth/login', () => {
		it('should return 200 and login user if email and password match', async () => {
			await User.insertMany([{
				...userOne,
				password: hashedPassword
			}]);
			const loginCredentials = {
				email: userOne.emailAddress,
				password: userOne.password,
			};
			const res = await request(app).post('/v1/auth/login').send(loginCredentials).expect(httpStatus.OK);
      expect(res.body.user).toEqual({
        accountNumber: userOne.accountNumber,
        identityNumber: userOne.identityNumber
      });
      expect(res.body.token).toEqual(expect.anything());
      expect(res.body.expires).toEqual(expect.anything());
		});
    it('should return 400 error if there are no users with that email', async () => {
      const loginCredentials = {
        email: userOne.email,
        password: userOne.password,
      };

      const res = await request(app).post('/v1/auth/login').send(loginCredentials).expect(httpStatus.BAD_REQUEST);

      expect(res.body).toEqual({ message: 'Incorrect email or password' });
    });
    it('should return 401 error if password is wrong', async () => {
			await User.insertMany([{
				...userOne,
				password: hashedPassword
			}]);
			const loginCredentials = {
				email: userOne.emailAddress,
				password: 'wrongPassword',
			};
			const res = await request(app).post('/v1/auth/login').send(loginCredentials).expect(httpStatus.BAD_REQUEST);

      expect(res.body).toEqual({ message: 'Incorrect email or password' });
		});
	});
});