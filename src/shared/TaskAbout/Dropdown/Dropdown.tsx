import React, {useEffect, useRef, useState} from 'react';
import styles from './dropdown.css';
import {DeleteIcon, EditIcon, MinusIcon, PlusIcon} from "../../Icons";
import {useDispatch, useSelector} from "react-redux";
import {ITask, RootState, updateTasks} from "../../store/store";
import {Editor} from "../Editor";


interface IDrop {
    button: React.ReactNode
    id: string
}

export function Dropdown(props: IDrop) {
    // dropdownMenu state
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    // delete_modal state
    const [isDeleted, setIsDeleted] = useState(false)
    // edit_modal state
    const [isEdited, setIsEdited] = useState(false)

    // refs
    const ref = useRef<HTMLUListElement>(null)
    const buttonRef = useRef<HTMLDivElement>(null)

    const value = useSelector<RootState, Array<ITask>>(state => state.tasks)
    const dispatch = useDispatch()


    // modal opening Function
    function handleMenu(type: string) {
        setIsDropdownOpen(false)
        if (type === 'delete_menu') {
            setIsDeleted(true)
        } else if (type === 'edit_menu') {
            setIsEdited(true)
        }
    }

    // Time Editor Function
    function handleTimeEditor(editor: string) {
        let newValue = value.map((item) => {
            if (item.id == props.id) {
                if (editor === '+') {
                    item.taskTime++
                }
                if (item.taskTime != 0 && editor === '-') {
                    item.taskTime--
                }
            }
            return item
        })
        dispatch(updateTasks(newValue))
    }

    // Function to open and close dropdown menu
    function handleClick() {
        if (isDropdownOpen) setIsDropdownOpen(false)
        else setIsDropdownOpen(true)
    }

    // close outside function
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (event.target instanceof Node
                && !buttonRef.current?.contains(event.target)
                && !ref.current?.contains(event.target)) {
                setIsDropdownOpen(false)
            }
        }

        document.addEventListener(
            'click',
            handleClickOutside)
        return () => {
            document.removeEventListener(
                'click',
                handleClickOutside)
        }
    }, [])

    return (
        <div>
            <div className={styles.button} ref={buttonRef} onClick={
                handleClick
            }>
                {props.button}
            </div>
            {isDropdownOpen && (
                <ul className={styles.dropdown} ref={ref}>
                    <li className={styles.item} onClick={() => {
                        handleTimeEditor('+')
                    }
                    }>
                        <PlusIcon/>
                        <span className={styles.text}>
                        Увеличить
                        </span>
                    </li>
                    <li className={styles.item} onClick={
                        () => {
                            handleTimeEditor('-')
                        }
                    }>
                        <MinusIcon/>
                        <span className={styles.text}>
                        Уменьшить
                        </span>
                    </li>
                    <li className={styles.item} onClick={() => {
                        handleMenu('edit_menu')
                    }}>
                        <EditIcon/>
                        <span className={styles.text}>
                        Редактировать
                        </span>
                    </li>
                    <li className={styles.item} onClick={() => {
                        handleMenu('delete_menu')
                    }}>
                        <DeleteIcon/>
                        <span className={styles.text}>
                        Удалить
                        </span>
                    </li>
                </ul>
            )}
            {isDeleted && (
                <Editor
                    id={props.id}
                    type={'delete'}
                    onClose={
                        () => setIsDeleted(false)
                    }
                />
            )}
            {isEdited && (
                <Editor
                    id={props.id}
                    type={'edit'}
                    onClose={
                        () => setIsEdited(false)
                    }
                />
            )}
        </div>
    );
}
