import React, { useEffect, useState } from 'react';
import styles from './HomePage.module.css';
import { TwitterPicker } from 'react-color'; //https://casesandberg.github.io/react-color/#api

export default function HomePage() {
  const [task, setTask] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [tasksArray, setTasksArray] = useState([]);
  const [color, setColor] = useState('');

  const changeTask = (e) => setTask(e.target.value);
  const changeTaskTitle = (e) => setTaskTitle(e.target.value);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChangeComplete = (color) => {
    setColor(color.hex);
    console.log(color.hex);
  };

  const addTaskToArray = (task, taskTitle, color) => {
    const taskTime = currentTime.toLocaleTimeString();
    const taskInfo = {
      task: task,
      taskTitle: taskTitle,
      color: color,
      taskTime: taskTime,
    };
    console.log(taskInfo);
    //if task to add is identical to the latest task in array, then alert
    if (
      tasksArray.length > 0 &&
      task === tasksArray[tasksArray.length - 1].task
    ) {
      alert('You just added this task!');
    } else {
      //creating new array from existing array and updating state variable and adding new task
      setTasksArray([...tasksArray, taskInfo]);
      // setTasksArray([...tasksArray, taskInfo]);
      // console.log(task);
    }
  };

  const submitTask = (e) => {
    e.preventDefault();
    if (task.length > 0) {
      addTaskToArray(task, taskTitle, color);
    } else {
      alert('Please input a task');
    }
  };
  // a function called deleteTaskFromArr that takes one parameter called taskToDelete.
  const deleteTaskFromArr = (taskToDelete) => {
    //filter method is called on tasksArray, which creates a new array containing only the elements that pass a certain test. In this case, the test is whether the element is not equal to taskToDelete,then setting the tasksArray state to this new array.
    setTasksArray(tasksArray.filter((task) => task !== taskToDelete));
    setCompletedTask(completedTask.filter((task) => task !== taskToDelete));
    // when the last element in an array is deleted, set task array in local storage to be empty
    if (tasksArray.length === 1) {
      localStorage.setItem('tasks', JSON.stringify([]));
    }
    if (completedTask.length === 1) {
      localStorage.setItem('completedTasks', JSON.stringify([]));
    }
  };

  //Completed tasks
  const [completedTask, setCompletedTask] = useState([]);

  // add task to completed tasks array and remove from tasks array
  const completeTask = (taskToComplete) => {
    setCompletedTask([...completedTask, taskToComplete]);
    setTasksArray(tasksArray.filter((task) => task !== taskToComplete));
  };

  //restore and then store in this order to prevent the storing useEffect from setting an empty array to local storage
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')); //turn string array back into array to be used/displayed
    if (storedTasks) setTasksArray(storedTasks);

    const storedCompletedTasks = JSON.parse(
      localStorage.getItem('completedTasks')
    );
    if (storedCompletedTasks) setCompletedTask(storedCompletedTasks);
  }, []);

  useEffect(() => {
    console.log(tasksArray);
    if (tasksArray.length) {
      // only store the state if task array  exists and it's length is greater than 0
      localStorage.setItem('tasks', JSON.stringify(tasksArray)); //turns array into string to be able to store in local storage
    }
  }, [tasksArray]);

  useEffect(() => {
    console.log(completedTask);
    if (completedTask.length) {
      // only store the state if task array  exists and it's length is greater than 0
      localStorage.setItem('completedTasks', JSON.stringify(completedTask)); //turns array into string to be able to store in local storage
    }
  }, [completedTask]);

  // Used to set current button as active
  const [active, setActive] = useState('1');

  const activeBtn = (e) => {
    setActive(e.target.id);
  };

  return (
    <div>
      <header>
        <h1 className={styles.name}>
          To Do Today
          {/* <span id={styles.gm}>gm</span> */}
        </h1>
        <nav>
          <ul>
            <li>
              <button className={styles.startBtn}>Start</button>
            </li>
            <li className={styles.date}>Date</li>
          </ul>
        </nav>
      </header>
      <main>
        <div className={styles.container}>
          <h2>To do list:</h2>

          <div className={styles.buttons}>
            <button className={styles.editBtn}>Edit</button>
          </div>
        </div>
        {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~  FORM TO ADD TASK ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
        <div className={styles.formContainer}>
          <form className={styles.addForm} onSubmit={submitTask}>
            <div className={styles.toDoContainer}>
              <div className={styles.toDoHeading}>
                <label className={styles.toDoLabel}>To Do:</label>
                <p>Add a task you need to complete!</p>
              </div>
              <button className={styles.addBtn}>Add</button>
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

              <p className={styles.colorTitle}>Colour:</p>
              <div className={styles.colorPicker}>
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

              {/* <div
                className={`${styles.colorBox} ${styles[active]}`}
                onClick={handleClick}
              ></div>
              <div
                className={`${styles.colorBox2} ${styles[active]}`}
                onClick={handleClick}
              ></div>
              <div
                className={`${styles.colorBox3} ${styles[active]}`}
                onClick={handleClick}
              ></div> */}
            </div>
          </form>
        </div>

        <div>
          <button
            key={1}
            onClick={activeBtn}
            className={active === '1' ? `${styles.currentBtn}` : undefined}
            id={'1'}
          >
            Active Tasks
          </button>
          <button
            key={2}
            onClick={activeBtn}
            id={'2'}
            className={active === '2' ? `${styles.currentBtn}` : undefined}
          >
            Completed Tasks
          </button>
        </div>
        {/* ~~~~~~~~~~~~~~~~~~~ Mapping through task array to display each object as a task  ~~~~~~~~~~~~~~~~~~~*/}

        <div className={`${styles.listContainer} ${styles.content}`}>
          {active === '1' &&
            tasksArray.map((task, index) => (
              <div key={index}>
                <div
                  className={styles.listItem}
                  style={{ backgroundColor: [task.color] }}
                >
                  <div className={styles.flex}>
                    <p className={styles.taskIndex}>{index + 1}.</p>
                    <div>
                      <p
                        className={`${styles.taskContent} ${styles.taskTitle}`}
                      >
                        {task.taskTitle}
                      </p>
                      <p className={styles.taskContent}>{task.task}</p>
                    </div>
                  </div>
                  <div>
                    <button
                      className={`${styles.deleteBtn}`}
                      onClick={() => completeTask(task)}
                    >
                      complete
                    </button>
                    <button
                      onClick={() => deleteTaskFromArr(task)}
                      className={styles.deleteBtn}
                    >
                      remove
                    </button>
                  </div>
                </div>
                <div className={styles.time}>
                  <p>Task created on {task.taskTime}</p>
                </div>
              </div>
            ))}
          {active === '2' &&
            completedTask.map((completedTask, index) => (
              <div key={index}>
                <div
                  className={styles.listItem}
                  style={{ backgroundColor: [completedTask.color] }}
                >
                  <div className={styles.flex}>
                    <p className={styles.taskIndex}>{index + 1}.</p>
                    <div>
                      <p
                        className={`${styles.taskContent} ${styles.taskTitle}`}
                      >
                        {completedTask.taskTitle}
                      </p>
                      <p className={styles.taskContent}>{completedTask.task}</p>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => deleteTaskFromArr(completedTask)}
                      className={styles.deleteBtn}
                    >
                      remove
                    </button>
                  </div>
                </div>
                <div className={styles.time}>
                  <p>Task created on {completedTask.taskTime}</p>
                </div>
              </div>
            ))}
          {/* {storedTasks.map((task, index) => (
            <div className={styles.listItem}>
              <p>
                {index + 1}. {task}
              </p>
            </div>
          ))} */}
        </div>
      </main>
    </div>
  );
}
