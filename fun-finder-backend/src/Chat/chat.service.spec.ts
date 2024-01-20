import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ChatService } from './chat.service';
import { Message } from './ChatInterfaces/message.model';

describe('ChatService', () => {
  let service: ChatService;
  let mockMessagesModel;

  beforeEach(async () => {
    mockMessagesModel = {
      find: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue([]),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatService,
        {
          provide: getModelToken('Messages'),
          useValue: mockMessagesModel,
        },
      ],
    }).compile();

    service = module.get<ChatService>(ChatService);
  });

  it('should get messages for a conversation', async () => {
    const mockId = '123';
    const mockMessages = [
      { id: '1', conversation_id: mockId, date: new Date() },
      { id: '2', conversation_id: mockId, date: new Date() },
    ];

    mockMessagesModel.exec.mockResolvedValue(mockMessages);

    const result = await service.getMessages(mockId);

    expect(result).toEqual(mockMessages);
    expect(mockMessagesModel.find).toHaveBeenCalledWith({ conversation_id: mockId });
    expect(mockMessagesModel.sort).toHaveBeenCalledWith({ date: 'asc' });
  });

  it('should handle error when getting messages', async () => {
    const mockId = '123';
    mockMessagesModel.exec.mockRejectedValue(new Error('Test error'));

    try {
      await service.getMessages(mockId);
    } catch (err) {
      expect(err.message).toEqual('failed to find messages');
    }
  });
});