import React from 'react';
import * as styles from './styles.module.css';

const TopBar = () => {
  const isInRoom = true;

  const leaveRoomHandler = () => {
    return;
  };

  const createRoomHandler = () => {
    return;
  };
  
  return (
    <div className={styles.topBar}>
      <div className={styles.topBarLeft}>
        <span className={styles.topBarTitle}>Socket.io Chat</span>
      </div>
      <div className={styles.topBarRight}>
        {isInRoom
          ? <button type="button" onClick={leaveRoomHandler} className={styles.topBarButton}>Leave room</button>
          : <button type="button" onClick={createRoomHandler} className={styles.topBarButton}>Create room</button>
        }
      </div>
    </div>
  );
};

export default TopBar;
