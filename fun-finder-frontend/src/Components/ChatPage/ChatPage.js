import React, { Component } from "react";
import "./ChatPage.css";
import ChatTypes from "./ChatTypes/ChatTypes";
import ChatClouds from "./ChatClouds/ChatClouds";
import ChatMessages from "./ChatMessages/ChatMessages";

class ChatPageComponent extends Component {
    constructor(props) {
        super(props);
            this.state = {
                whichChatToDisplay: 'person',
                whichMessagesToDisplay: 0,

                person: [{
                image: '"../../../../Images/Monkey_test.jpg"',
                id: 1,
                name:'John',
                surename: 'Johnson',
                newMessage:"How are u"
                },
                {
                image: '"../../../../Images/Monkey_test.jpg"',
                id: 2,
                name:'Tommmy',
                surename: 'Cash',
                newMessage:"I like mango"
                }],
                group: [
                    {
                    image: '"../../../../Images/Monkey_test.jpg"',
                    id: 1,
                    name:'Tommy Lee',
                    surename: 'Johnson',
                    newMessage:"How are u"
                    },
                    {
                    image: '"../../../../Images/Monkey_test.jpg"',
                    id: 2,
                    name:'Antoni',
                    surename: 'Brocoli',
                    newMessage:"I like mango"
                    }],
                event: [{
                    image: '"../../../../Images/Monkey_test.jpg"',
                    id: 1,
                    name:'Patricia',
                    surename: 'tran',
                    newMessage:"<3 <3"
                    },
                    {
                    image: '"../../../../Images/Monkey_test.jpg"',
                    id: 2,
                    name:'tomson',
                    surename: 'tomson',
                    newMessage:"I like mango"
                    }],
                messages: [
                {
                    id: 0,
                    userId: 0,
                    message: "hello"
                },
                {
                    id: 1,
                    userId: 0,
                    message: "no u"
                },
                {
                    id: 2,
                    userId: 1,
                    message: "what?"
                }
                ]

            };
        }

    updateWichChatToDisplay = (data) => {
        this.setState({whichChatToDisplay: data});
    };
    updateWichMessagesToDisplay = (chatId) => {
        this.setState({whichMessagesToDisplay: chatId})
    };

    

    render() {
        return (
            <div className="chat-page">
                <div className="chat-clouds-section">
                    <ChatTypes
                     updateWichChatToDisplay={this.updateWichChatToDisplay}/>
                    <ChatClouds 
                    passChatCloudsDBData={this.state[this.state.whichChatToDisplay]} 
                    updateWichMessagesToDisplay={this.updateWichMessagesToDisplay}/>
                </div>
                <div className="chat-messages-section">
                    {this.state.whichMessagesToDisplay > 0 && (
                        <ChatMessages passWichMessageToDisplay={this.state.messages}/>
                    )}
                </div>
            </div>
        );
    }
    
}


export default ChatPageComponent;