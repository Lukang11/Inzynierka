import { Test, TestingModule } from '@nestjs/testing';
import { CloudsController } from './chatClouds.controller';
import { ChatCloudsService } from './chatClouds.service';

describe('CloudsController', () => {
  let controller: CloudsController;
  let service: ChatCloudsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CloudsController],
      providers: [
        {
          provide: ChatCloudsService,
          useValue: {
            findUserInPrivateChat: jest.fn().mockResolvedValue('findUserInPrivateChat'),
            findUserEventChats: jest.fn().mockResolvedValue('findUserEventChats'),
            getParticipantsInfo: jest.fn().mockResolvedValue('getParticipantsInfo'),
            createNewPrivateChat: jest.fn().mockResolvedValue('createNewPrivateChat'),
            createNewEventChat: jest.fn().mockResolvedValue('createNewEventChat'),
            addUserToEventChat: jest.fn().mockResolvedValue('addUserToEventChat'),
          },
        },
      ],
    }).compile();

    controller = module.get<CloudsController>(CloudsController);
    service = module.get<ChatCloudsService>(ChatCloudsService);
  });

  it('should call findUserInPrivateChat with correct parameters', async () => {
    await controller.getAllCloudsByParticipianId('1');
    expect(service.findUserInPrivateChat).toHaveBeenCalledWith('1');
  });

  it('should call findUserEventChats with correct parameters', async () => {
    await controller.getAllEventChatClouds('1');
    expect(service.findUserEventChats).toHaveBeenCalledWith('1');
  });

  it('should call createNewPrivateChat with correct parameters', async () => {
    const data = { userCreatingChatId: '1', chatParticipantId: '2' };
    await controller.createPrivateChat(data);
    expect(service.createNewPrivateChat).toHaveBeenCalledWith(data.userCreatingChatId, data.chatParticipantId);
  });

  it('should call createNewEventChat with correct parameters', async () => {
    const data = { userCreatingChatId: '1', chatName: 'Chat 1', imageUrl: 'avatar.png', event_id: 'event1' };
    await controller.createEventChat(data);
    expect(service.createNewEventChat).toHaveBeenCalledWith(data.userCreatingChatId, data.chatName, data.imageUrl, data.event_id);
  });

  it('should call addUserToEventChat with correct parameters', async () => {
    const data = { userId: '1', eventId: 'event1' };
    await controller.addUserToEventChat(data);
    expect(service.addUserToEventChat).toHaveBeenCalledWith(data.userId, data.eventId);
  });
});