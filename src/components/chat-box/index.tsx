import React from 'react';
import { useMediaQuery } from 'react-responsive';
import ChatBoxDesktop from '../../features/chat-box-desktop/chat-box-desktop';
import ChatBoxMobile from '../../features/chat-box-mobile/chat-box-mobile';

const ChatBox = () => {
  const isDesktop = useMediaQuery({ minWidth: 768 });

  return isDesktop ? <ChatBoxDesktop /> : <ChatBoxMobile />;
};

export default ChatBox;
