import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './users.controller';
import { User, UserHobbies } from './UsersInterfaces/users.model';
import { UserService } from './users.service';
import { HttpStatus } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import * as jwt from 'jsonwebtoken';

describe('Users Controller', () => {
  let controller: UserController;
  let service: UserService;
  let googleOAuthClient: OAuth2Client
  let jwtVerify: jest.Mock;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
      
        {
          provide: UserService,
          useValue: {
            findByEmail: jest.fn(),
            findById: jest.fn(),
            createUser: jest.fn(() => Promise.resolve({
              email: 'test@123.com',
              password: 'password',
              fname: 'test',
              lname: 'test',
              description: 'test',
              hobbies: ['test'],
            } )),
            loginUser: jest.fn(),
            updateUserDescByEmail: jest.fn(),
            getUserDescByEmail: jest.fn(),
            updateUserAvatarByEmail: jest.fn(),
            getCurrentUserDataById: jest.fn(),
            updatedUser: jest.fn(),
            getUserHobbiesByEmail: jest.fn(),
          }
          
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  

   it('should handle logout', async () => {
    const mockResponse = {
      clearCookie: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await controller.logout(mockResponse as any);
    expect(mockResponse.clearCookie).toHaveBeenCalledWith('accessToken', expect.any(Object));
    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
  });

  it('should return user description by email', async () => {
    const email = 'test@example.com';
    const description = 'Test Description';
    jest.spyOn(service, 'getUserDescByEmail').mockResolvedValue(description);

    expect(await controller.getCurrentUserDesc(email)).toEqual({ description });
    expect(service.getUserDescByEmail).toHaveBeenCalledWith(email);
  });
  
  it('should update user avatar by email', async () => {
    const email = 'test@example.com';
    const avatar = 'new-avatar-url';
    const updatedUser = { email, avatar } as User; 
    jest.spyOn(service, 'updateUserAvatarByEmail').mockResolvedValue(updatedUser);

    const result = await controller.updateCurrentUserAvatar(email, { avatar });
    expect(result).toEqual({ message: 'Avatar updated successfully', user: updatedUser });
    expect(service.updateUserAvatarByEmail).toHaveBeenCalledWith(email, avatar);
  });

  it('should update user description by email', async () => {
    const email = 'test@example.com';
    const description = 'Updated Description';
    jest.spyOn(service, 'updateUserDescByEmail').mockResolvedValue({} as User);

    expect(await controller.updateCurrentUserDesc(email, { description })).toEqual({ message: 'Description updated successfully', user: {} as User });
    expect(service.updateUserDescByEmail).toHaveBeenCalledWith(email, description);
  });
  it('should get current user data by ID', async () => {
    type PartialUser = Partial<User>;
    const userId = '123456'; 
    const userData = {   
    email: 'test@example.com',
    fname: 'John',
    lname: 'Doe',
    hobbies: [],
    events: [],
    description: '',
    score: 0,
    avatar: '', } as  User;
    jest.spyOn(service, 'findById').mockResolvedValue(userData);

    const result = await controller.getCurrentUserDataById(userId);
    expect(result).toEqual(userData);
    expect(service.findById).toHaveBeenCalledWith(userId);
  });
  it('should get user hobbies by email', async () => {
    const email = 'test@example.com';
    const hobbies = 'Hobby 1' as unknown as UserHobbies[];
    jest.spyOn(service, 'getUserHobbiesByEmail').mockResolvedValue(hobbies);

    const result = await controller.getCurrentUserHobbies(email);
    expect(result).toEqual({ hobbies });
    expect(service.getUserHobbiesByEmail).toHaveBeenCalledWith(email);
  });

 
  
 
});