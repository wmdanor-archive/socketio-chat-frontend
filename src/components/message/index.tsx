import React from 'react';
import * as SCT from '../../services/socket-io/types/server-to-client';

interface MessageProps {
  message: SCT.MessageData;
  isAuthor: boolean;
}

const Message: React.FC<MessageProps> = ({ message, isAuthor }) => {
  const nicknameStyle = isAuthor ? { color: 'red'} : {};

  return (
    <div>
      <span style={nicknameStyle}>{message.nickname}</span>
      <span> : </span>
      <span>{message.message}</span>
    </div>
  );
};

export default Message;
