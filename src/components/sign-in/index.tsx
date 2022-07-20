import React, { FormEventHandler, useId } from 'react';
import * as styles from './styles.module.css';

const SignIn = () => {
  const usernameId = useId();

  const signInHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const username = event.currentTarget.username.value;

    console.log(username);
  };

  return (
    <div className={styles.signInContainer}>
      <div className={styles.signInTop}>
        <span className={styles.signInTitle}>Socket.io Chat</span>
      </div>
      <div className={styles.signInBottom}>
        <form className={styles.signInForm} onSubmit={signInHandler}>
          <div className={styles.signInFormGroup}>
            <label className={styles.signInFormGroupLabel} htmlFor={usernameId}>Username</label>
            <input required className={styles.signInFormGroupInput} id={usernameId} type="text" name="username" />
          </div>
          <button className={styles.signInFormButton} type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
