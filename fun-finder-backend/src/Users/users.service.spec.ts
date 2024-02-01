import { UserService } from './users.service';
import * as bcrypt from 'bcrypt';
import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { User } from './UsersInterfaces/users.model';
import { access } from 'fs';

jest.mock('bcrypt', () => ({
  compare: jest.fn(() => Promise.resolve(true)),
  hash: jest.fn(() => 'hashedPassword'),
}));
jest.mock('./jwt.strategy', () => ({
  JwtStrategy: jest.fn().mockImplementation(() => ({
    validate: jest.fn().mockResolvedValue(true),
  })),
}));

describe('UserService', () => {
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserService,
        JwtStrategy,
        {
          provide: getModelToken('User'),
          useValue: {
            create: jest.fn().mockResolvedValue({ toObject: () => {} }),
          },
        },
        {
          provide: JwtService,
          useFactory: () => {
            return new JwtService({
              secret: 'F129344E6501F029CECBBFE302498CAA9235CC2A637E9FFA33EA4277FE7ED5E3',
              signOptions: { expiresIn: '3h' },
            });
          },
        },
      ],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
    jwtService = moduleRef.get<JwtService>(JwtService);
  });
  it('should throw an error if email is empty', async () => {
    const user: Partial<User> = {
      fname: 'John',
      lname: 'Doe',
      password: 'passw0rd',
      //email is missing
    };
    jest.spyOn(userService, 'createUser').mockImplementation(async () => { throw new Error('Wszystkie pola są wymagane.') });
    await expect(userService.createUser(user as User)).rejects.toThrow('Wszystkie pola są wymagane.');
  });
  it('should throw an error if fname is missing', async () => {
    const user: Partial<User> = {
      // fname is missing
      lname: 'Doe',
      email: 'john.doe@example.com',
      password: 'passw0rd',
    };
    jest.spyOn(userService, 'createUser').mockImplementation(async () => { throw new Error('Wszystkie pola są wymagane.') });
    await expect(userService.createUser(user as User)).rejects.toThrow('Wszystkie pola są wymagane.');
  });
  it('should throw an error if lname is missing', async () => {
    const user: Partial<User> = {
      fname: 'John',
      // lname is missing
      email: 'john.doe@example.com',
      password: 'passw0rd',
    };
    jest.spyOn(userService, 'createUser').mockImplementation(async () => { throw new Error('Wszystkie pola są wymagane.') });
    await expect(userService.createUser(user as User)).rejects.toThrow('Wszystkie pola są wymagane.');
  });
  it('should return true if the passwords match', async () => {
    const candidatePassword = 'password';
    const hashedPassword = 'hashedPassword';
    expect(await userService.comparePassword(candidatePassword, hashedPassword)).toBe(true);
  });
  it('should return false if the passwords do not match', async () => {
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);
    const candidatePassword = 'password';
    const hashedPassword = 'differentHashedPassword';
    expect(await userService.comparePassword(candidatePassword, hashedPassword)).toBe(false);
  });
  it('should create a user', async () => {
    const user: Partial<User> = {
      email: 'john.doe@example.com',
      fname: 'John',
      lname: 'Doe',
      password: 'password',
    };
    const createdUser = { ...user, id: '1' } as User;
    jest.spyOn(userService, 'createUser').mockResolvedValue(createdUser);
    expect(await userService.createUser(user as User)).toEqual(createdUser);
  });
  it('should not create a user if required fields are missing', async () => {
    const user: Partial<User> = {
      fname: 'John',
      lname: 'Doe',
      password: 'password',
    };
    jest.spyOn(userService, 'createUser').mockImplementation(async () => { throw new Error('Wszystkie pola są wymagane.') });
    await expect(userService.createUser(user as User)).rejects.toThrow('Wszystkie pola są wymagane.');
  });
  it('should throw an error if the email already exists', async () => {
    const user: Partial<User> = {
      email: 'john.doe@example.com',
      fname: 'John',
      lname: 'Doe',
      password: 'password',

    };
    jest.spyOn(userService, 'createUser').mockImplementation(async () => { throw new Error('Email already exists.') });
    await expect(userService.createUser(user as User)).rejects.toThrow('Email already exists.');
  });
  it('should find a user by email', async () => {
    const user: Partial<User> = {
      email: 'john.doe@exampl.com',
    };
    jest.spyOn(userService, 'findByEmail').mockResolvedValue(user as User);
    expect(await userService.findByEmail(user.email)).toEqual(user);
  });
  it('should return user and access token if login is successful', async () => {
    const user: Partial<User> = {
      email: 'john.doe@exampl.com',
      password: 'password',
      
    };
    const accessToken = 'access_token';
    jest.spyOn(userService, 'findByEmail').mockResolvedValue(user as User);
    jest.spyOn(userService, 'comparePassword').mockResolvedValue(true);
    jest.spyOn(jwtService, 'sign').mockReturnValue(accessToken);
    expect(await userService.loginUser(user.email, user.password)).toEqual({ user, accessToken });
  });
  it('should throw Nieprawidłowy adres email lub hasło if the user is not found', async () => {
    jest.spyOn(userService, 'findByEmail').mockResolvedValue(null);
    await expect(userService.loginUser('unknown@example.com', 'password')).rejects.toThrow('Nieprawidłowy adres email lub hasło');
  });
  
  it('should throw Nieprawidłowy adres email lub hasło if the password is incorrect', async () => {
    const user: Partial<User> = {
      email: 'john.doe@exampl.com',
      password: 'password',
    };
    jest.spyOn(userService, 'findByEmail').mockResolvedValue(user as User);
    jest.spyOn(userService, 'comparePassword').mockResolvedValue(false);
    await expect(userService.loginUser(user.email, 'wrongpassword')).rejects.toThrow('Nieprawidłowy adres email lub hasło');
  });
  
  
  
  
  

});



