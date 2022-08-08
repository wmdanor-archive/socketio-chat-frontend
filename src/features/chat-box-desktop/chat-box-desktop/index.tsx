import React from 'react';
import {
  ClientToServerEventsEnum,
  getSocket,
  ServerToClientEventsEnum,
  setSocketConnectionStatus,
} from '../../../services/socket-io';
import { useAppDispatch, useAppSelector } from '../../../store';
import * as roomState from '../../../store/slices/room.slice';
import * as userState from '../../../store/slices/user.slice';
import * as messagesState from '../../../store/slices/messages.slice';
import Body from '../body';
import TopBar from '../top-bar';
import * as styles from './styles.module.css';

const ChatBoxDesktop = () => {
  const socket = getSocket();
  const username = useAppSelector(userState.selectUsername);
  const dispatch = useAppDispatch();

  socket.on('connect', () => {
    setSocketConnectionStatus(true);
    console.log('connected', socket.id, username);

    // const reply = prompt('Enter your nickname') ?? Math.random().toString();

    // setName(reply);

    const roomName = 'global';

    socket
      .emit(ClientToServerEventsEnum.NewConnection, { username })
      .emit(ClientToServerEventsEnum.JoinRoom, { name: roomName });

    dispatch(roomState.setName(roomName));
  });

  socket.on('disconnect', () => {
    console.log('disconnected', socket.id);
  });

  socket.on(ServerToClientEventsEnum.JoinRoom, (data) => {
    console.log('joinRoom', data);
    dispatch(roomState.setUsers(data.roomUsers));
  });

  socket.on(ServerToClientEventsEnum.LeaveRoom, (data) => {
    console.log('leaveRoom', data);
    dispatch(roomState.setUsers(data.roomUsers));
  });

  socket.on(ServerToClientEventsEnum.Message, (data) => {
    console.log('message', data);
    dispatch(messagesState.appendMessage(data));
  });

  return (
    <div className={styles.container}>
      <TopBar />
      <Body />
    </div>
  );
};

export default ChatBoxDesktop;
