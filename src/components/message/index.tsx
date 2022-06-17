import React from 'react';
import * as SCT from '../../services/socket-io/types/server-to-client';
import styles from './styles.css';

interface MessageProps {
  message: SCT.MessageData;
  isAuthor: boolean;
}

const Message: React.FC<MessageProps> = ({ message, isAuthor }) => {
  const nicknameClass = isAuthor ? styles.isAuthor : '';

  return (
    <div>
      <span className={nicknameClass}>{message.nickname}</span>
      <span> : </span>
      <span>{message.message}</span>
    </div>
  );
};

export default Message;
