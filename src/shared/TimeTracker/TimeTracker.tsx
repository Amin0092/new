import React, {useEffect, useState} from 'react';
import styles from './timetracker.css';
import {ITask, RootState, updateCurrentTask} from "../store/store";
import {useDispatch, useSelector} from "react-redux";
import {useTimer} from "react-timer-hook";


export function TimeTracker() {
    const value = useSelector<RootState, Array<ITask>>(state => state.tasks)
    const currentTask = useSelector<RootState, ITask>(state => state.currentTask)
    const dispatch = useDispatch()

    const time = new Date()

    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentBreak, setCurrentBreak] = useState(0)
    const [timerValue, setTimerValue] = useState('')

    const {
        seconds,
        minutes,
        hours,
        isRunning,
        start,
        pause,
        resume,
        restart
    } = useTimer({
        expiryTimestamp: time,
        autoStart: false,
        onExpire: () => expireTimer()
    });

    function expireTimer() {
        if (timerValue === 'task') {
            setCurrentBreak(prevState => prevState + 1)
        } else if (timerValue === 'break') {
            if (currentTask.taskTime > 1) {
                currentTask.taskTime--
            } else if (currentTask.taskTime === 1) {
                setCurrentIndex(prevState => prevState + 1)
            }
        }
    }

    // starting timer
    const startTimer = () => {
        start()
    };


    // stopTimer function
    const stopTimer = () => {
        pause()
    };

    const resetTimer = () => {
        const time = new Date();
        time.setSeconds(time.getSeconds() + 60);
        restart(time, false);
    };

    function addTime() {
        time.setSeconds(time.getSeconds() + 3)
        restart(time, true);
    }

    // updating current task
    useEffect(() => {
        if (value.length === 0) return;
        if (value.length > 0 && value.length > currentIndex) {
            dispatch(updateCurrentTask(value[currentIndex]))
        } else if (currentIndex === value.length) {
            stopTimer()
        }
    }, [value, currentIndex]);

    // restarting timer for a break
    useEffect(() => {
        if (currentBreak != 0) {
            if (currentBreak % 4 === 0) {
                time.setSeconds(time.getSeconds() + 7)
            } else if (currentBreak % 4 !== 0) {
                time.setSeconds(time.getSeconds() + 3)
            }
            restart(time, false)
            setTimerValue('break')
        }
    }, [currentBreak])

    // restarting timer for new task
    useEffect(() => {
        if (currentTask.taskTime != 0) {
            time.setSeconds(time.getSeconds() + 10)
            restart(time, false)
            setTimerValue('task')
        }
    }, [currentTask, currentTask.taskTime])


    return (
        <div className={styles.timeTracker}>
            <div className={styles.taskInfo}>
                <p className={styles.taskName}>{timerValue === 'break' ? 'time to break' : currentTask.title}</p>
                <p className={styles.taskNumber}>{timerValue !== 'break' ? 'Помидор ' + currentTask.taskTime : ''}</p>
            </div>
            <div className={styles.timer}>
                <div className={styles.time}>
                    <h1>{hours + ':' + minutes + ':' + seconds}</h1>
                    <button className={styles.addTime} onClick={addTime}>
                        +
                    </button>
                </div>
                <p>Задача {currentIndex + 1} - <span>{currentTask.title}</span></p>
                <div className={styles.controls}>
                    <button
                        className={styles.start}
                        onClick={startTimer}
                    >
                        <span>Старт</span>
                    </button>
                    <button className={styles.stop} onClick={stopTimer}>
                        Стоп
                    </button>
                </div>
            </div>
        </div>
    );
}