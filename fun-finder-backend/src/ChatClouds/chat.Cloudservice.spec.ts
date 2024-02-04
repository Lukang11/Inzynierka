import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ChatCloudsService } from './chatClouds.service';

describe('ChatCloudsService', () => {
  let service: ChatCloudsService;
  let userModel: any;
  let privateChatModel: any;
  let eventChats: any;
  let events: any;

  beforeEach(async () => {
    userModel = {
      findOne: jest.fn(),
    };
    privateChatModel = {
      find: jest.fn(),
      findOne: jest.fn(),
    };
    eventChats = {
      find: jest.fn(),
      findOne: jest.fn(),
    };
    events = {
      findById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatCloudsService,
        {
          provide: getModelToken('User'),
          useValue: userModel,
        },
        {
          provide: getModelToken('Private_Chats'),
          useValue: privateChatModel,
        },
        {
          provide: getModelToken('Event_Chats'),
          useValue: eventChats,
        },
        {
          provide: getModelToken('Events'),
          useValue: events,
        },
      ],
    }).compile();

    service = module.get<ChatCloudsService>(ChatCloudsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get user info by id', async () => {
    const result = { _id: '1', fname: 'John', lname: 'Doe', avatar: 'avatar.png' };
    userModel.findOne.mockResolvedValue(result);
    expect(await service.getUserInfoById('1')).toEqual(result);
    expect(userModel.findOne).toHaveBeenCalledWith({ _id: '1' });
  });

  it('should find user in private chat', async () => {
    const result = [{ chatId: '1', name: 'John Doe', avatar: 'avatar.png', lastMessage: 'Hello', participants: ['1', '2'] }];
    privateChatModel.find.mockResolvedValue([{ id: '1', participants: ['1', '2'], last_message: 'Hello' }]);
    userModel.findOne.mockResolvedValue({ _id: '2', fname: 'John', lname: 'Doe', avatar: 'avatar.png' });
    expect(await service.findUserInPrivateChat('1')).toEqual(result);
    expect(privateChatModel.find).toHaveBeenCalledWith({ participants: '1' });
    expect(userModel.findOne).toHaveBeenCalledWith({ _id: '2' });
  });
  
  it('should find user event chats', async () => {
    const result = [{ participants: ['1'], chatId: '1', name: 'Chat 1', avatar: 'avatar.png', lastMessage: 'Hello' }];
    eventChats.find.mockResolvedValue([{ _id: '1', participants: ['1'], name: 'Chat 1', avatar: 'avatar.png', last_message: 'Hello' }]);
    expect(await service.findUserEventChats('1')).toEqual(result);
    expect(eventChats.find).toHaveBeenCalledWith({ participants: '1' });
  });
  it('should find user event chats with different user id', async () => {
    const userId = '2';
    const eventChatsForUser = [{ _id: '2', participants: ['1', '2'], name: 'Chat 2', avatar: 'avatar.png', last_message: 'Hello' }];
    eventChats.find.mockResolvedValue(eventChatsForUser);
    const result = await service.findUserEventChats(userId);
    expect(result).toEqual(eventChatsForUser.map(chat => ({
      chatId: chat._id,
      participants: chat.participants,
      name: chat.name,
      avatar: chat.avatar,
      lastMessage: chat.last_message
    })));
    expect(eventChats.find).toHaveBeenCalledWith({ participants: userId });
  });

  it('should get user info by different id', async () => {
    const userId = '2';
    const userInfo = { _id: '2', name: 'Jane Doe', avatar: 'avatar.png' };
    userModel.findOne.mockResolvedValue(userInfo);
    const result = await service.getUserInfoById(userId);
    expect(result).toEqual(userInfo);
    expect(userModel.findOne).toHaveBeenCalledWith({ _id: userId });
  });
  
  it('should get participants info', async () => {
    const participantsIds = ['1', '2'];
    const participantsInfo = [
        { _id: '1', fname: 'John', lname: 'Doe', avatar: 'avatar.png' },
        { _id: '2', fname: 'Jane', lname: 'Doe', avatar: 'avatar.png' },
    ];

    const result = await service.getParticipantsInfo({ participantsIds: participantsIds as [string] });

    expect(result).toEqual(participantsIds.map((id, index) => ({
            id: id,
            fname: participantsInfo[index].fname,
            lname: participantsInfo[index].lname,
            avatar: participantsInfo[index].avatar,
    })));

    participantsIds.forEach(id => {
      expect(userModel.findOne).toHaveBeenCalledWith({ _id: id });
    });
  });
  
  
 
});