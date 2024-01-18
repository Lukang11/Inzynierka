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

          const otherParticipant = await this.getUserInfoById(otherParticipantsIds[0]); // pobranie danych drugiego rozmowcy 
          participantInfo.push({
            id: otherParticipant._id,
            chatId: privateChat.id,
            fname: otherParticipant.fname,
            lname: otherParticipant.lname,
            avatar: otherParticipant.avatar,
            lastMessage: privateChat.last_message,
          });

      }
      return participantInfo;
    } catch (error) {
      console.log(error)
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
          participants: eventChat.participants,
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

  async createNewPrivateChat(userCreatingChatId: string, chatParticipantId: string) {
    const isThisChatArleadyExists = await this.privateChatModel.findOne({
      participants: {
        $all: [userCreatingChatId,chatParticipantId]
      }
    });

    if (isThisChatArleadyExists) {
      console.log("this chat exists")
      return
    }
    const newPrivateChatCloud = new this.privateChatModel ({
        participants: [userCreatingChatId,chatParticipantId],
        created_at: new Date,
        last_message: "",
    })
    this.sendNewPrivateChat(newPrivateChatCloud);
  }

  async sendNewPrivateChat(PrivateChatObject: PrivateChat) {
    try {
        await PrivateChatObject.save();
        console.log("created");
    } catch (err) {
        console.error("unable to create user", err);
    }
  }
  
  async createNewGroupChat(userCreatingChatId: string, chatName: string) {
    const newGroupChatCloud = new this.groupChat ({
      participants: [userCreatingChatId],
      last_message: "",
      name: chatName,
      created_at: new Date
    })
    this.sendNewGroupChat(newGroupChatCloud);
  }
  
  async sendNewGroupChat(groupChatObject: GroupChat){
    try{
      await groupChatObject.save();
      console.log("created");
    }
    catch (err) {
      console.error("unable to create groupChat", err);
    }
  }

  async createNewEventChat(userCreatingChatId: string, chatName: string) {
    const newEventChatCloud = new this.eventChats ({
      participants: [userCreatingChatId],
      last_message: "",
      name: chatName,
      created_at: new Date
    });
    this.sendNewEventChat(newEventChatCloud);
  }

  async sendNewEventChat(eventChatObject: EventChat) {
    try {
      await eventChatObject.save();
      console.log("created");
    }
    catch (err) {
      console.error("unable to create eventChat", err);
    }
  }
}
