import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/Users/UsersInterfaces/users.model';
import { GroupChat } from 'src/Chat/ChatInterfaces/groupChat.model';
import { EventChat } from 'src/Chat/ChatInterfaces/eventChat.model';
import { PrivateChat } from './ChatCloudsInterfaces/chatclouds.model';
import { Events } from 'src/Events/EventInterfaces/events.model';

@Injectable()
export class ChatCloudsService {
  constructor(
    @InjectModel('Private_Chats') private readonly privateChatModel: Model<PrivateChat>,
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Event_Chats') private readonly eventChats: Model<EventChat>,
    @InjectModel('Events') private readonly events: Model<Events>
  ) {}

  async getParticipantsInfo( data: {participantsIds: [string]}) {
    try {
      const participantsInfo = [];
      for (const id of data.participantsIds) {
        const participantInfo = await this.getUserInfoById(id);
        participantsInfo.push({
          id: participantInfo._id.toString(),
          fname: participantInfo.fname,
          lname: participantInfo.lname,
          avatar: participantInfo.avatar
        });
      }
      console.log(participantsInfo);
      return participantsInfo;
    }
    catch (err) {
      console.log("failed to get participants info");
    }
  };

  async findUserInPrivateChat(userId: string) {
    try {
      console.log('user id :' ,userId)
      const privateChatsWithUser = await this.privateChatModel.find({ participants: userId });
      if (!privateChatsWithUser || privateChatsWithUser.length === 0) {
        
      }

      const participantInfo = [];

      for (const privateChat of privateChatsWithUser) {
        const otherParticipantsIds = privateChat.participants.filter(participant => participant !== userId);
        console.log(otherParticipantsIds);
          const otherParticipant = await this.getUserInfoById(otherParticipantsIds[0]); // pobranie danych drugiego rozmowcy 
          participantInfo.push({
            chatId: privateChat.id,
            name: otherParticipant.fname + " " + otherParticipant.lname,
            avatar: otherParticipant.avatar,
            lastMessage: privateChat.last_message,
            participants: [userId,otherParticipant._id]
          });

      }
      return participantInfo;
    } catch (error) {
      console.log(error)
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
          avatar: eventChat.avatar,
          lastMessage: eventChat.last_message
        };

        eventChatInfo.push(eventChatData);
      };
      return eventChatInfo;
    } catch (error) {
      console.log(error);
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
  

  async createNewEventChat(userCreatingChatId: string, chatName: string, imageUrl: string,event_id: string) {
    const newEventChatCloud = new this.eventChats ({
      participants: [userCreatingChatId],
      last_message: "",
      name: chatName,
      avatar: imageUrl,
      created_at: new Date,
      event_id: event_id
    });
    console.log(newEventChatCloud);
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
  async addUserToEventChat(userId: string, eventId: string) {
    try {
      const eventChat = await this.eventChats.findOne({event_id: eventId});
      const event = await this.events.findById(eventId)

      if(eventChat && event) {
        if(eventChat.participants.includes(userId)){
          console.log("user is arleady a participant");
        }
        else {
          if(event.maxEventParticipants < eventChat.participants.length + 1) {
            console.log("max users reached");
          }
          else {
            eventChat.participants.push(userId);
            await eventChat.save();
          console.log("user added to eventChat !");
          }
        }
      }
      else {
        console.log("could not find event chat");
      }

    }
    catch(err) {
      console.log("failed to add user to chat");
    }
}
}
