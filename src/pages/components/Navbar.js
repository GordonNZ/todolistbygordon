import React from 'react';
import styles from '../HomePage.module.css';

export default function Header({ currentTime, currentDate }) {
  return (
    <div>
      <header>
        <h1 className={styles.name}>
          myToDoList
          {/* <span id={styles.gm}>gm</span> */}
        </h1>
        <nav>
          <ul>
            <li></li>
            <li className={styles.date}>{currentTime}</li>
            <li className={styles.date}>{currentDate}</li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
