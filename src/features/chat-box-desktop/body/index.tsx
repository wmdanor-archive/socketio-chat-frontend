import React from 'react';
import InfoBar from '../info-bar';
import MessageBox from '../message-box';
import RoomSelector from '../room-selector';
import * as styles from './styles.module.css';

const Body = () => {
  const isInRoom = true;

  return (
    <div className={styles.container}>
      {
        isInRoom
          ? <InfoBar />
          : <RoomSelector />
      }
      <MessageBox />
    </div>
  );
};

export default Body;
