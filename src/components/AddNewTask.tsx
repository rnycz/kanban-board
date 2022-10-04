import React, { useRef } from 'react'
import '../styles/styles.css'
import { CirclePicker, ColorResult } from 'react-color'
import { colors, setDate, switchDateFormat, addTaskError } from '../model'
import Calendar from 'react-calendar'
import { ImCross } from 'react-icons/im'
import { useStateContext } from '../contexts/ContextProvider'

const AddNewTask: React.FC = () => {
    const {
        todos,
        setTodos,
        online,
        todoInput,
        setTodoInput,
        showOptions,
        setShowOptions,
        finishTask,
        setFinishTask,
        color,
        setColor,
    } = useStateContext()

    const inputRef = useRef<HTMLInputElement>(null)

    const onChangeDate = (newDate: React.SetStateAction<Date>) => {
        setFinishTask(newDate)
    }

    const handleChangeColor = (color: ColorResult) => {
        setColor(color.hex)
    }

    const displayEditDate: string = setDate(finishTask)

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault()

        if (todoInput && color) {
            if (online) {
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        todo: todoInput,
                        isDone: false,
                        color: color,
                        addDate: setDate(new Date()),
                        finishDate: setDate(finishTask),
                        type: 'todo',
                    }),
                }
                fetch('http://localhost:3001/tasks/', requestOptions)
                    .then((response: Response) => {
                        return response.json()
                    })
                    .then((result: any) => {
                        setTodos([
                            ...todos,
                            {
                                _id: result._id,
                                todo: todoInput,
                                isDone: false,
                                color: color,
                                addDate: setDate(new Date()),
                                finishDate: setDate(finishTask),
                                type: 'todo',
                            },
                        ])
                    })
                    .catch((error: Error) => console.log('error: ', error))
            } else {
                setTodos([
                    ...todos,
                    {
                        _id: Date.now(),
                        todo: todoInput,
                        isDone: false,
                        color: color,
                        addDate: setDate(new Date()),
                        finishDate: setDate(finishTask),
                        type: 'todo',
                    },
                ])
            }
            setTodoInput('')
            setShowOptions(!showOptions)
            setFinishTask(new Date())
        } else {
            addTaskError()
        }
    }

    return (
        <div className="task-container">
            <button
                className="task-modal-button"
                onClick={() => setShowOptions(!showOptions)}
            >
                Add New Task
            </button>
            {showOptions ? (
                <div className="task-modal">
                    <div className="task-modal-wrap">
                        <span
                            className="close-modal"
                            onClick={() => setShowOptions(!showOptions)}
                        >
                            <ImCross />
                        </span>
                        <form
                            className="input"
                            onSubmit={(e) => {
                                handleAdd(e)
                                inputRef.current?.blur()
                            }}
                        >
                            <input
                                type="input"
                                placeholder="Enter a task"
                                className="input-box"
                                ref={inputRef}
                                value={todoInput}
                                onChange={(e) => setTodoInput(e.target.value)}
                            />
                            <button className="input-submit" type="submit">
                                ADD
                            </button>
                        </form>
                        <div className="options-container">
                            <div className="input-color-container">
                                <CirclePicker
                                    className="input-color"
                                    colors={colors}
                                    onChange={handleChangeColor}
                                />
                                <span
                                    className="task-color"
                                    style={{ backgroundColor: color }}
                                >
                                    Task Color
                                </span>
                                <span className="task-finish">
                                    Deadline:{' '}
                                    {switchDateFormat(displayEditDate)}
                                </span>
                            </div>
                            <Calendar
                                className="calendar"
                                onChange={onChangeDate}
                                value={finishTask}
                                locale="en-EN"
                            />
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default AddNewTask
