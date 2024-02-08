import React from 'react';
import styles from './task.css';
import {ControlsIcon} from "../../Icons";
import {Dropdown} from "../Dropdown";

interface TaskProps {
    task: {
        id: string,
        title: string,
        taskTime: number
    };
}

export function Task({task}: TaskProps) {
    return (
        <div className={styles.task}>
            <div className={styles.left}>
                <div className={styles.counts}>
                    {task.taskTime}
                </div>
                <p className={styles.taskName}>
                    {task.title}
                </p>
            </div>
            <Dropdown
                id={task.id}
                button={
                    <button className={styles.controls}>
                        <ControlsIcon/>
                    </button>
                }
            />
        </div>
    );
}
