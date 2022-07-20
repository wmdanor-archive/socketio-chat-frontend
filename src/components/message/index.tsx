import React from 'react';
import { MessageDataSC } from '../../services/socket-io/types';
import styles from './styles.module.css';

interface MessageProps {
  message: MessageDataSC;
  isAuthor: boolean;
}

const Message: React.FC<MessageProps> = ({ message, isAuthor }) => {
  const nicknameClass = isAuthor ? styles.isAuthor : '';

  return (
    <div>
      <span className={nicknameClass}>{message.username}</span>
      <span> : </span>
      <span>{message.message}</span>
    </div>
  );
};

export default Message;
