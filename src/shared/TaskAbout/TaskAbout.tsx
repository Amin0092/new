import React, {FormEvent, useEffect, useRef} from 'react';
import styles from './taskabout.css';
import {useDispatch, useSelector} from "react-redux";
import {ITask, RootState, updateCurrentTask, updateTasks} from "../store/store";
import {Task} from "./Task";


export function TaskAbout() {
    const value = useSelector<RootState, Array<ITask>>(state => state.tasks)
    const dispatch = useDispatch()
    const taskRef = useRef<HTMLInputElement>(null)
    const numberRef = useRef<HTMLInputElement>(null)

    // getting value from LocalStorage
    useEffect(() => {
        let pomodoro = localStorage.getItem('pomodoro')

        const localValue = JSON.parse(pomodoro!)

        dispatch(updateTasks(localValue))
    }, [])

    // saving value from localStorage
    useEffect(() => {
        localStorage.setItem('pomodoro', JSON.stringify(value))
    }, [value])

    // adding new tasks to the list
    function handleSubmit(event: FormEvent) {
        event.preventDefault()
        let pomodoro_val: ITask = {
            id: Math.random().toString(36).substring(2, 15),
            title: String(taskRef.current?.value),
            taskTime: Number(numberRef.current?.value),
            isActive: false,
            isCompleted: false,
        }
        dispatch(updateTasks(value.concat(pomodoro_val)))
    }

    return (
        <div className={styles.taskAbout}>
            <h2 className={styles.taskTitle}>Ура! Теперь можно начать работать:</h2>
            <ul className={styles.pomodoroInfo}>
                <li>Выберите категорию и напишите название текущей задачи</li>
                <li>Запустите таймер («помидор»)</li>
                <li> Работайте пока «помидор» не прозвонит</li>
                <li> Сделайте короткий перерыв (3-5 минут)</li>
                <li> Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена. Каждые 4
                    «помидора» делайте длинный перерыв (15-30 минут).
                </li>
            </ul>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder='Название задачи'
                    className={styles.input}
                    ref={taskRef}
                    minLength={3}
                    required
                />
                <input
                    placeholder='Количество помидорок'
                    type="number"
                    defaultValue={1}
                    min='1'
                    max='10'
                    className={styles.input}
                    ref={numberRef}

                />
                <button className={styles.addTask}>Добавить</button>
            </form>
            <div className={styles.taskList}>
                {value.length != 0 && value.map((task: any) => (
                    <Task key={task.id} task={task}/>
                ))}
                <p className={styles.time}>
                    50 min
                </p>
            </div>
        </div>
    );
}
