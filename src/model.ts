import { toast } from 'react-toastify'

export interface Todo {
    id: number
    todo: string
    isDone: boolean
    color: string
    addDate: string
    finishDate: string
}

export const colors: string[] = [
    '#990000',
    '#ff0000',
    '#804000',
    '#e65c00',
    '#ffcc00',
    '#ffff1a',
    '#99cc00',
    '#66ff33',
    '#0099ff',
    '#66ffff',
    '#99ccff',
    '#9966ff',
    '#9900cc',
    '#ff3399',
    '#ff99ff',
    '#b3b3b3',
    '#f2f2f2',
    '#4d4d4d',
]

export const addTaskError = () => toast.error('Enter a task and choose a color')
export const editTaskOn = () =>
    toast.warn('Cannot mark as done. You are editing this task')
export const taskDeleted = () => toast.info('Task has been deleted')
export const markedTask = () => toast.warn('Cannot edit marked as done task')
export const successEdit = () => toast.success('Successfully edited a task')
export const emptyTaskOnEdit = () => toast.error('Task cannot be empty')

const pad = (num: number) => ('0' + num).slice(-2)
export const setDate = (date: Date) => {
    let day = date.getDate(),
        month = date.getMonth() + 1,
        year = date.getFullYear()
    return `${year}-${pad(month)}-${pad(day)}`
}

export const switchDateFormat = (date: string) => {
    const splitDate: string[] = date.split('-')
    splitDate.reverse()
    return splitDate.join('.')
}
