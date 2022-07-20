import React from 'react';
import { useAppSelector } from '../../../store';
import { selectRoom } from '../../../store/slices/room.slice';
import { selectUsername } from '../../../store/slices/user.slice';
import * as styles from './styles.module.css';

const InfoBar = () => {
  const username = useAppSelector(selectUsername);
  const room = useAppSelector(selectRoom);

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <span className={styles.sectionTitle}>Room Name:</span>
        <span className={styles.roomName}>{room.name}</span>
      </div>
      <div className={styles.section}>
        <span className={styles.sectionTitle}>Users</span>
        <ul className={styles.sectionList}>
          {
            room.users.map((user, index) => (
              <li key={index} className={
                username === user
                  ? `${styles.sectionListItem} ${styles.isCurrentUser}`
                  : styles.sectionListItem
              }>{user}</li>
            ))
          }
        </ul>
      </div>
    </div>
  );
};

export default InfoBar;
