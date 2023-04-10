import React from 'react';
import styles from '../HomePage.module.css';

export default function Header({ currentTime, currentDate }) {
  return (
    <div>
      <header>
        <h1 className={styles.name}>
          To Do Today
          {/* <span id={styles.gm}>gm</span> */}
        </h1>
        <nav>
          <ul>
            {/* <li>
        <button className={styles.startBtn}>Start</button>
      </li> */}
            <li className={styles.date}>{currentTime}</li>
            <li className={styles.date}>{currentDate}</li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
