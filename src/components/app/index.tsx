import React, { ChangeEventHandler, useState } from 'react';
import { ClientToServerEventsEnum, getSocket, ServerToClientEventsEnum } from '../../services/socket-io';
import * as SCT from '../../services/socket-io/types/server-to-client';
import Message from '../message';

const App = () => {
  const socket = getSocket();

  socket.on('connect', () => {
    console.log('connected', socket.id);
    setConnected(true);

    const reply = prompt('Enter your nickname') ?? Math.random().toString();

    setNickname(reply);

    socket.emit(ClientToServerEventsEnum.NewConnection, { nickname: reply }).emit(ClientToServerEventsEnum.JoinRoom, {});
  });

  socket.on('disconnect', () => {
    console.log('disconnected', socket.id);
  });

  socket.on(ServerToClientEventsEnum.Message, (data: SCT.MessageData) => {
    setMessages([...messages, data]);
  });

  const [nickname, setNickname] = useState('');
  const [isConnected, setConnected] = useState(false);
  const [messages, setMessages] = useState<SCT.MessageData[]>([]);
  const [text, setText] = useState('');

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setText(e.target.value);
  };

  const handleClick = () => {
    console.log('Sending message', text);

    setMessages([...messages, {
      message: text,
      nickname,
    }]);

    socket.emit(ClientToServerEventsEnum.Message, {
      message: text,
    });
  };

  return (
    isConnected ? (<div className="container">
      <input type="text" onChange={handleChange}/>
      <button type="button" onClick={handleClick}>Send</button>
      <div>
        Messages:
        {messages.map((message, index) => (
          <Message key={index} message={message} isAuthor={message.nickname === nickname} />
        ))}
      </div>
    </div>) : (<div className="container">Connecting to the server...</div>)
  );
};

export default App;
