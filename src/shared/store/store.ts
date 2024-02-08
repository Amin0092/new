import {ActionCreator, Reducer} from "redux";


export interface ITask {
    id: string;
    title: string;
    taskTime: number;
    isActive: boolean;
    isCompleted: boolean;
}

export type RootState = {
    tasks: ITask[],
    currentTask: ITask,
}
export const initialState: RootState = {
    tasks: [],
    currentTask: {id: "", title: "", taskTime: 0, isActive: false, isCompleted: false},
}
const UPDATE_TASKS = 'UPDATE_TASKS'
type UpdateTasksAction = {
    type: typeof UPDATE_TASKS,
    tasks: string
}
export const updateTasks: ActionCreator<UpdateTasksAction> = (tasks) => ({
    type: UPDATE_TASKS,
    tasks,
})

const UPDATE_CURRENT_TASK = 'UPDATE_CURRENT_TASK'
type UpdateCurrentTaskAction = {
    type: typeof UPDATE_CURRENT_TASK,
    currentTask: ITask
}
export const updateCurrentTask: ActionCreator<UpdateCurrentTaskAction> = (currentTask) => ({
    type: UPDATE_CURRENT_TASK,
    currentTask,
})
export const rootReducer: Reducer<RootState> = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_TASKS :
            return {
                ...state,
                tasks: action.tasks
            }
        case UPDATE_CURRENT_TASK :
            return {
                ...state,
                currentTask: action.currentTask
            }
        default:
            return state
    }
}

