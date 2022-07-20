import React, { ChangeEventHandler, createRef, FormEventHandler, useEffect, useState } from 'react';
import { ClientToServerEventsEnum, getSocket } from '../../../services/socket-io';
import { useAppDispatch, useAppSelector } from '../../../store';
import { selectMessages, appendMessage } from '../../../store/slices/messages.slice';
import { selectRoom } from '../../../store/slices/room.slice';
import { selectUsername } from '../../../store/slices/user.slice';
import * as styles from './styles.module.css';

const MessageBox = () => {
  const socket = getSocket();
  const room = useAppSelector(selectRoom);
  const messages = useAppSelector(selectMessages);
  const username = useAppSelector(selectUsername);
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const messagesContainerRef = createRef<HTMLDivElement>();

  useEffect(() => {
    const isEmpty = message.length === 0;

    if (isButtonDisabled && !isEmpty) {
      setIsButtonDisabled(false);
    }

    if (!isButtonDisabled && isEmpty) {
      setIsButtonDisabled(true);
    }
  }, [message]);

  useEffect(() => {
    messagesContainerRef.current?.scroll(
      messagesContainerRef.current?.scrollLeft,
      messagesContainerRef.current?.scrollHeight
    );
  }, [messages]);

  const messageChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;

    setMessage(value);
  };

  const sendMessageHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (!message) {
      return;
    }

    setMessage('');

    dispatch(appendMessage({
      username,
      message,
    }));

    for (let i = 0; i < 25; i++) {
      dispatch(appendMessage({
        username,
        message,
      }));
    }

    socket.emit(ClientToServerEventsEnum.Message, { message });
  };
  
  if (!room.name) {
    return (<span>Please join a room</span>);
  }

  return (
    <div className={styles.container}>
      <div className={styles.messagesContainer} ref={messagesContainerRef}>
        {messages.map((message, index) => (
          <div key={index}>
            <span className={message.username === username ? styles.author : ''}>{message.username}</span>
            <span>: </span>
            <span>{message.message}</span>
          </div>
        ))}
      </ div>
      <div className={styles.inputContainer}>
        <form className={styles.inputForm} onSubmit={sendMessageHandler}>
          <input
            className={styles.inputFormInput}
            type="text"
            name="message"
            placeholder="Enter your message"
            value={message}
            onChange={messageChangeHandler}
          />
          <button
            className={styles.inputFormButton}
            disabled={isButtonDisabled}
            type="submit"
          >Send message</button>
        </form>
      </div>
    </div>
  );
};

export default MessageBox;
