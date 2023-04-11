import React from 'react';
import styles from '../HomePage.module.css';
import { TwitterPicker } from 'react-color'; //https://casesandberg.github.io/react-color/#api
import Calendar from 'react-calendar'; //https://www.npmjs.com/package/react-calendar
import 'react-calendar/dist/Calendar.css';
import '../Modal.css';
import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
//Modal: https://medium.com/tinyso/how-to-create-a-modal-component-in-react-from-basic-to-advanced-a3357a2a716a

export default function AddTaskForm({ addTaskToArray, show, onClose }) {
  const [completeBy, setCompleteBy] = useState('');
  const [task, setTask] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [color, setColor] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  const changeTask = (e) => setTask(e.target.value);
  const changeTaskTitle = (e) => setTaskTitle(e.target.value);

  const handleChangeComplete = (color) => {
    setColor(color.hex);
    console.log(color.hex);
  };

  if (completeBy === '') {
    setCompleteBy('Unset');
  }

  const submitTask = (e) => {
    e.preventDefault();

    if (task.length > 0) {
      addTaskToArray(task, taskTitle, color, completeBy);
    } else {
      alert('Please input a task');
    }
  };

  const completeByFunc = (completeDay) => {
    // console.log('hello', completeDay);
    // console.log(currentTime);
    // console.log(completeDay);
    setCompleteBy(completeDay.toLocaleDateString());
    if (completeDay.toLocaleDateString() === currentTime.toLocaleDateString()) {
      setCompleteBy('Today');
    }
  };

  //   if (!show) {
  //     return null;
  //   }
  return (
    <CSSTransition in={show} unmountOnExit timeout={{ enter: 0, exit: 300 }}>
      <div className={`modal ${show ? 'show' : ''}`} onClick={onClose}>
        {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~  FORM TO ADD TASK ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

        <div className={styles.formContainer}>
          <form
            className={styles.addForm}
            onSubmit={submitTask}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.toDoContainer}>
              <div className={styles.toDoHeading}>
                <label className={styles.toDoLabel}>To Do:</label>
                <p>Add a task you need to complete!</p>
              </div>
              <button className={`${styles.addBtn} ${styles.button}`}>
                Add
              </button>
              <button
                className={`${styles.addBtn} ${styles.button}`}
                onClick={onClose}
              >
                Close
              </button>
            </div>

            <div>
              <h3 className={styles.addTaskTitle}>Task Title:</h3>
              <input
                value={taskTitle}
                onChange={changeTaskTitle}
                placeholder='Add a title!'
                className={styles.addTaskInput}
              ></input>
              <h3 className={styles.addTaskTitle}>Task Description:</h3>
              <input
                value={task}
                onChange={changeTask}
                placeholder='Start typing!'
                className={styles.addTaskInput}
              ></input>

              <p className={styles.colorTitle}>Complete by:</p>
              <div className={styles.centerItem}>
                <Calendar
                  onClickDay={(value, event) => completeByFunc(value)}
                />
              </div>

              <p className={styles.colorTitle}>Colour:</p>
              <div className={styles.centerItem}>
                <TwitterPicker
                  colors={[
                    '#fb486b',
                    '#ff9e78',
                    '#ffde66',
                    '#00D084',
                    '#8ED1FC',
                    '#F78DA7',
                    '#cd78ff',
                  ]}
                  label='color'
                  triangle='hide'
                  onChangeComplete={handleChangeComplete}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </CSSTransition>
  );
}
