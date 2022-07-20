import React, { ChangeEventHandler, useState } from 'react';
import { ClientToServerEventsEnum, getSocket, ServerToClientEventsEnum } from '../../services/socket-io';
import { MessageDataSC } from '../../services/socket-io/types';
import Message from '../message';

const App = () => {
  const socket = getSocket();

  socket.on('connect', () => {
    console.log('connected', socket.id);
    setConnected(true);

    const reply = prompt('Enter your nickname') ?? Math.random().toString();

    setUsername(reply);

    socket
      .emit(ClientToServerEventsEnum.NewConnection, { username: reply })
      .emit(ClientToServerEventsEnum.JoinRoom, { name: 'global '});
  });

  socket.on('disconnect', () => {
    console.log('disconnected', socket.id);
  });

  socket.on(ServerToClientEventsEnum.Message, (data: MessageDataSC) => {
    setMessages([...messages, data]);
  });

  const [username, setUsername] = useState('');
  const [isConnected, setConnected] = useState(false);
  const [messages, setMessages] = useState<MessageDataSC[]>([]);
  const [text, setText] = useState('');

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setText(e.target.value);
  };

  const handleClick = () => {
    console.log('Sending message', text);

    setMessages([...messages, {
      username,
      message: text,
    }]);

    socket.emit(ClientToServerEventsEnum.Message, {
      message: text,
    });
  };

  return (
    isConnected ? (<div className="sign-in-container">
      <input type="text" onChange={handleChange}/>
      <button type="button" onClick={handleClick}>Send</button>
      <div>
        Messages:
        {messages.map((message, index) => (
          <Message key={index} message={message} isAuthor={message.username === username} />
        ))}
      </div>
    </div>) : (<div className="sign-in-container">Connecting to the server...</div>)
  );
};

export default App;
