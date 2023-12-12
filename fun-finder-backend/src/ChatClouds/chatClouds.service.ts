import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/Auth/AuthInterfaces/users.model';
import { GroupChat } from 'src/Chat/ChatInterfaces/groupChat.model';
import { EventChat } from 'src/Chat/ChatInterfaces/eventChat.model';
import { PrivateChat } from './ChatCloudsInterfaces/chatclouds.model';

@Injectable()
export class ChatCloudsService {
  constructor(
    @InjectModel('Private_Chats') private readonly privateChatModel: Model<PrivateChat>,
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Group_Chats') private readonly groupChat: Model<GroupChat>,
    @InjectModel('Event_Chats') private readonly eventChats: Model<EventChat>
  ) {}

  async findUserInPrivateChat(userId: string) {
    try {
      const privateChatsWithUser = await this.privateChatModel.find({ participants: userId });

      if (!privateChatsWithUser || privateChatsWithUser.length === 0) {
        console.log('User not found in any private chat');
      }

      const participantInfo = [];

      for (const privateChat of privateChatsWithUser) {
        const otherParticipantsIds = privateChat.participants.filter(participant => participant !== userId);
        console.log(otherParticipantsIds);

          const otherParticipant = await this.getUserInfoById(otherParticipantsIds[0]); // pobranie danych drugiego rozmowcy 

          participantInfo.push({
            _id: otherParticipantsIds[0],
            chatId: privateChat.id,
            name: otherParticipant.fname + " " + otherParticipant.lname,
            lastMessage: privateChat.last_message,
          });

      }
      return participantInfo;
    } catch (error) {
      throw new Error('Failed to find user in private chat');
    }
  }

  async findUserGroupsChats(userId: string) {
    try {
      const groupChatsForUser = await this.groupChat.find({ participants: userId});
      if (!groupChatsForUser || groupChatsForUser.length === 0){
        console.log('No group chats for user');
      }

      const groupChatInfo = [];

      for ( const groupChat of groupChatsForUser) {
        const groupChatData = {
          chatId: groupChat._id,
          name: groupChat.name,
          lastMessage: groupChat.last_message,
        };
        groupChatInfo.push(groupChatData);
      };
      return groupChatInfo;
      
    } catch (error) {
      throw new Error('failed to find groups');
    }
  }

  async findUserEventChats(userId: string) {
    try {
      const eventChatsForUser = await this.eventChats.find({ participants: userId});
      if (!eventChatsForUser || eventChatsForUser.length === 0) {
         console.log('no event chats for user');
      }

      const eventChatInfo = [];

      for ( const eventChat of eventChatsForUser) {
        const eventChatData = {
          chatId: eventChat._id,
          name: eventChat.name,
          lastMessage: eventChat.last_message
        };
        eventChatInfo.push(eventChatData);
      };
      return eventChatInfo;
    } catch (error) {
      throw new Error('failed to find events');
    }
  };

  async getUserInfoById(userId: string) {
    try {
      const userInfo = await this.userModel.findOne({ _id: userId })
     return userInfo
      
    } catch (error) {
      throw new Error('Failed to find user by Id');
    }
    
    }
}
