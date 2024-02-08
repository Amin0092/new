import React from 'react';
import styles from './header.css';
import {Text} from "../Text";
import {LogoIcon, StatisticsIcon} from '../Icons'

export function Header() {
    return (
        <header>
            <div className={styles.logo}>
                <LogoIcon/>
                <p>pomodoro_box</p>
            </div>
            <div className={styles.statistics}>
                <StatisticsIcon/>
                <Text size={16}>Статистика</Text>
            </div>
        </header>
    );
}
