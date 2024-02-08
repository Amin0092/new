import React, {ChangeEvent, useState} from 'react';
import styles from './editor.css';
import {ITask, RootState, updateTasks} from "../../store/store";
import {useDispatch, useSelector} from "react-redux";


interface IEditor {
    id: string;
    type: string;
    onClose?: () => void;
}

export function Editor({id, type, onClose}: IEditor) {
    const value = useSelector<RootState, Array<ITask>>(state => state.tasks)
    const dispatch = useDispatch()

    const task: ITask = value.filter((item: ITask) => item.id === id)[0]

    const [title, setTitle] = useState(task.title)
    const [taskTime, setTaskTime] = useState(task.taskTime)

    function deleteTask() {
        if (type === 'delete') {
            const newValue = value.filter(item => item.id != id)
            console.log(newValue)
            onClose?.()
            dispatch(updateTasks(newValue))
        }
    }

    function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value)
    }

    function handleTaskTimeChange(event: ChangeEvent<HTMLInputElement>) {
        setTaskTime(Number(event.target.value))
    }

    function handleSubmit() {
        if (type === 'edit') {
            const newValue = value.map((item: ITask) => {
                if (item.id == id) {
                    item.title = title
                    item.taskTime = taskTime
                }
                return item
            })
            console.log(newValue)
            onClose?.()
            dispatch(updateTasks(newValue))
        }
    }

    return (
        <div className={styles.delete_menu}>
            {type === 'delete' && (
                <div className={styles.main_modal}>
                    <h3 className={styles.delete_title}>Удалить задачу?</h3>
                    <button className={styles.delete_button} onClick={deleteTask}>Удалить</button>
                    <button className={styles.cancel_button} onClick={onClose}>Отмена
                    </button>
                </div>
            )}
            {type === 'edit' && (
                <div className={styles.main_modal}>
                    <form className={styles.edit}>
                        <h3 className={styles.edit_title}>
                            Редактировать задачу
                        </h3>
                        <label className={styles.label}>
                            Название
                        </label>
                        <input
                            className={styles.input}
                            type="text"
                            value={title}
                            onChange={handleTitleChange}
                        />
                        <label className={styles.label}>Время</label>
                        <input
                            className={styles.input}
                            type="number"
                            min="1"
                            max="10"
                            value={taskTime}
                            onChange={handleTaskTimeChange}
                        />
                        <button
                            className={styles.edit_button}
                            onClick={handleSubmit}
                        >
                            Сохранить
                        </button>
                    </form>
                </div>
            )}
            <div
                className={styles.bg}
                onClick={
                    onClose
                }/>
        </div>
    );
}
