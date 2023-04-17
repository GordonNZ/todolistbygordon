import React, { useEffect, useState } from 'react';
import '../App.css';
import styles from './HomePage.module.css';
import 'react-calendar/dist/Calendar.css';
import AddTaskForm from './components/AddTaskForm';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';

export default function HomePage() {
  const [tasksArray, setTasksArray] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  //Completed tasks
  const [completedTask, setCompletedTask] = useState([]);
  const [show, setShow] = useState(false);

  // //update date and set currentTime at 1000 interval
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Add task function
  const addTaskToArray = (task, taskTitle, color, completeBy) => {
    const taskTime = `${currentTime.toDateString()} at ${currentTime.toLocaleTimeString()}`;
    const taskInfo = {
      task: task,
      taskTitle: taskTitle,
      color: color,
      taskTime: taskTime,
      completeBy: completeBy,
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

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <Navbar
        currentTime={currentTime.toLocaleTimeString()}
        currentDate={currentTime.toLocaleDateString()}
      />
      <Header />
      <main>
        <div className={styles.container}>
          <h2>To do list:</h2>

          {/* <button className={`${styles.editBtn} ${styles.button}`}>
              Edit
            </button> */}
          <button
            className={
              scrolled
                ? `${styles.plusBtn} ${styles.button} ${styles.scrolled}`
                : `${styles.plusBtn} ${styles.button}`
            }
            onClick={() => setShow(true)}
          >
            +
          </button>
        </div>
        {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~  FORM TO ADD TASK ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
        <AddTaskForm
          addTaskToArray={addTaskToArray}
          onClose={() => setShow(false)}
          show={show}
        />
        {/* ~~~~~~~~~~~~~~~~~~~~~~~~~ ACTIVE / COMPLETED BUTTONS  ~~~~~~~~~~~~~~~~~~~~~~~~~*/}
        <div>
          <button
            key={1}
            onClick={activeBtn}
            className={
              active === '1'
                ? `${styles.currentBtn} ${styles.button}`
                : `${styles.button}`
            }
            id={'1'}
          >
            Active Tasks
          </button>
          <button
            //data-testid for unit testing
            data-testid='2'
            key={2}
            onClick={activeBtn}
            id={'2'}
            className={
              active === '2'
                ? `${styles.currentBtn} ${styles.button}`
                : `${styles.button}`
            }
          >
            Completed Tasks
          </button>
        </div>
        {/* ~~~~~~~~~~~~~~~~~~~ Mapping through task array to display each object as a task  ~~~~~~~~~~~~~~~~~~~*/}

        <div className={`${styles.listContainer} ${styles.content}`}>
          {active === '1' &&
            tasksArray.map((task, index) => (
              <div key={index}>
                <div className={styles.flexwrap}>
                  <div
                    className={styles.listItem}
                    style={{ backgroundColor: [task.color] }}
                  >
                    <div className={`${styles.flex} `}>
                      <p className={styles.taskIndex}>{index + 1}.</p>
                      <div className={styles.taskContainer}>
                        <p
                          className={`${styles.taskContent} ${styles.taskTitle}`}
                        >
                          {task.taskTitle}
                        </p>
                        <p className={styles.taskContent}>{task.task}</p>
                      </div>
                    </div>
                    <div className={styles.taskButtons}>
                      <button
                        className={`${styles.deleteBtn} ${styles.button}`}
                        onClick={() => completeTask(task)}
                      >
                        complete
                      </button>
                      <button
                        onClick={() => deleteTaskFromArr(task)}
                        className={`${styles.deleteBtn} ${styles.button}`}
                      >
                        remove
                      </button>
                    </div>
                  </div>
                  {/* <div
                    className={`${styles.taskInfoContainer} ${styles.flexwrap}`}
                  > */}
                  <div className={styles.taskTime}>
                    <p className={styles.taskCreatedOn}>Task created on</p>
                    <p className={styles.taskCreatedOn}>{task.taskTime}</p>
                  </div>
                  <div className={styles.taskTime}>
                    <p className={styles.taskCreatedOn}>Complete by:</p>
                    <p
                      className={`${styles.taskCreatedOn} ${styles.taskCompleteBy}`}
                    >
                      {task.completeBy} !
                    </p>
                  </div>
                </div>
                {/* </div> */}
              </div>
            ))}
          {/* ~~~~~~~~~~~~~~~~~~~ Mapping through COMPLETED task array to display each object ~~~~~~~~~~~~~~~~~~~*/}
          {active === '2' &&
            completedTask.map((completedTask, index) => (
              <div key={index}>
                <div className={styles.flexwrap}>
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
                        <p className={styles.taskContent}>
                          {completedTask.task}
                        </p>
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={() => deleteTaskFromArr(completedTask)}
                        className={`${styles.deleteBtn} ${styles.button}`}
                      >
                        remove
                      </button>
                    </div>
                  </div>
                  <div className={styles.taskTime}>
                    <p className={styles.taskCreatedOn}>Task created on</p>
                    <p className={styles.taskCreatedOn}>
                      {completedTask.taskTime}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
