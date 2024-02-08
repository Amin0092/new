import React from 'react';
import styles from './tasktracker.css';
import {TaskAbout} from "../TaskAbout";
import {TimeTracker} from "../TimeTracker";

export function TaskTracker() {
    return (
        <div className={styles.taskTracker}>
            <TaskAbout/>
            <TimeTracker/>
        </div>
    );
}
