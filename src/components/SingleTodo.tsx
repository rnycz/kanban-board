import React, { useEffect, useRef, useState } from 'react'
import {
    Todo,
    colors,
    editTaskOn,
    taskDeleted,
    markedTask,
    successEdit,
    emptyTaskOnEdit,
} from '../model'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import {
    MdDoneAll,
    MdRemoveDone,
    MdDownloadDone,
    MdAccessTime,
} from 'react-icons/md'
import { GoDiffAdded } from 'react-icons/go'
import { FcExpired } from 'react-icons/fc'
import { BsExclamationLg } from 'react-icons/bs'
import '../styles/styles.css'
import { Draggable } from 'react-beautiful-dnd'
import { CirclePicker, ColorResult } from 'react-color'
import Calendar from 'react-calendar'
import { setDate, switchDateFormat } from '../model'

interface Props {
    index: number
    todo: Todo
    todos: Todo[]
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
    online: boolean
}

const SingleTodo: React.FC<Props> = ({
    index,
    todo,
    todos,
    setTodos,
    online,
}: Props) => {
    const [edit, setEdit] = useState<boolean>(false)
    const [editTodo, setEditTodo] = useState<string>(todo.todo)
    const [editColor, setEditColor] = useState<string>(todo.color)
    const [editDate, setEditDate] = useState<Date>(new Date(todo.finishDate))
    const [showColorPicker, setShowColorPicker] = useState<boolean>(false)
    const [showCalendar, setShowCalendar] = useState<boolean>(false)

    const inputRef = useRef<HTMLInputElement>(null)

    const displayEditDate: string = setDate(editDate)

    const handleChangeColor = (color: ColorResult) => {
        setEditColor(color.hex)
    }

    const onChangeDate = (newDate: React.SetStateAction<Date>) => {
        setEditDate(newDate)
        setShowCalendar(false)
    }
    const dateDiff = (today: Date, finishDate: string) => {
        const t2: number = new Date(finishDate).getTime()
        const t1: number = today.getTime()
        return (t2 - t1) / (24 * 3600 * 1000)
    }

    useEffect(() => {
        inputRef.current?.focus()
    }, [edit])

    const handleDone = (id: number) => {
        if (online) {
            const requestOptions = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    isDone: !todo.isDone,
                }),
            }
            fetch('http://localhost:3001/tasks/' + id, requestOptions)
                .then((response: Response) => {
                    return response.json()
                })
                .then(() => {
                    setTodos(
                        todos.map((todo) =>
                            todo._id === id
                                ? { ...todo, isDone: !todo.isDone }
                                : todo,
                        ),
                    )
                })
                .catch((error: Error) => console.log('error: ', error))
        } else {
            setTodos(
                todos.map((todo) =>
                    todo._id === id ? { ...todo, isDone: !todo.isDone } : todo,
                ),
            )
        }
    }

    const handleDelete = (id: number) => {
        if (online) {
            const requestOptions = {
                method: 'DELETE',
            }
            fetch('http://localhost:3001/tasks/' + id, requestOptions)
                .then((response: Response) => {
                    return response.json()
                })
                .then(() => {
                    setTodos(todos.filter((todo) => todo._id !== id))
                })
                .catch((error: Error) => console.log('error: ', error))
        } else {
            setTodos(todos.filter((todo) => todo._id !== id))
        }
    }

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault()
        if (editTodo === '') {
            emptyTaskOnEdit()
        } else {
            if (online) {
                const requestOptions = {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        todo: editTodo,
                        color: editColor,
                        finishDate: displayEditDate,
                    }),
                }
                fetch('http://localhost:3001/tasks/' + id, requestOptions)
                    .then((response: Response) => {
                        return response.json()
                    })
                    .then(() => {
                        setTodos(
                            todos.map((todo) =>
                                todo._id === id
                                    ? {
                                          ...todo,
                                          todo: editTodo,
                                          color: editColor,
                                          finishDate: displayEditDate,
                                      }
                                    : todo,
                            ),
                        )
                    })
                    .catch((error: Error) => console.log('error: ', error))
            } else {
                setTodos(
                    todos.map((todo) =>
                        todo._id === id
                            ? {
                                  ...todo,
                                  todo: editTodo,
                                  color: editColor,
                                  finishDate: displayEditDate,
                              }
                            : todo,
                    ),
                )
            }
            setEdit(false)
            if (
                todo.todo !== editTodo ||
                todo.color !== editColor ||
                todo.finishDate !== displayEditDate
            ) {
                successEdit()
            }
        }
    }

    return (
        <Draggable draggableId={todo._id.toString()} index={index}>
            {(provided) => (
                <form
                    className="single-todo"
                    onSubmit={(e) => handleEdit(e, todo._id)}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <div className="time-container">
                        <span className="date">
                            <GoDiffAdded className="date-icon" />
                            {switchDateFormat(todo.addDate)}
                        </span>
                        {edit ? (
                            <div className="date date-edit">
                                <MdAccessTime
                                    className="date-icon"
                                    onClick={() =>
                                        setShowCalendar(!showCalendar)
                                    }
                                />
                                <span
                                    onClick={() =>
                                        setShowCalendar(!showCalendar)
                                    }
                                >
                                    {switchDateFormat(displayEditDate)}
                                </span>
                                {showCalendar ? (
                                    <Calendar
                                        onChange={onChangeDate}
                                        value={editDate}
                                        locale="en-EN"
                                    />
                                ) : null}
                            </div>
                        ) : (
                            <span className="date">
                                {dateDiff(new Date(), todo.finishDate) <= 1 &&
                                dateDiff(new Date(), todo.finishDate) > -1 ? (
                                    <BsExclamationLg className="date-icon warning" />
                                ) : null}
                                {dateDiff(new Date(), todo.finishDate) < -1 ? (
                                    <FcExpired className="date-icon expired" />
                                ) : null}
                                <MdAccessTime className="date-icon" />
                                {switchDateFormat(todo.finishDate)}
                            </span>
                        )}
                    </div>
                    <hr />
                    <div>
                        {edit ? (
                            <div className="single-todo-container">
                                <div
                                    className="single-todo-color-edit"
                                    onClick={() =>
                                        setShowColorPicker(!showColorPicker)
                                    }
                                    style={{ backgroundColor: editColor }}
                                >
                                    {showColorPicker ? (
                                        <CirclePicker
                                            className="input-color"
                                            colors={colors}
                                            onChange={handleChangeColor}
                                        />
                                    ) : null}
                                </div>
                                <input
                                    value={editTodo}
                                    onChange={(e) =>
                                        setEditTodo(e.target.value)
                                    }
                                    className="single-todo-input"
                                    ref={inputRef}
                                />
                            </div>
                        ) : (
                            <div
                                className={`single-todo-container ${
                                    todo.isDone ? 'done' : null
                                }`}
                            >
                                <div
                                    className="single-todo-color"
                                    style={{ backgroundColor: todo.color }}
                                ></div>
                                <span className="single-todo-text">
                                    {todo.todo}
                                </span>
                            </div>
                        )}
                        <div className="icons-container">
                            <span
                                className="icon"
                                onClick={(e) => {
                                    if (!edit && !todo.isDone) {
                                        setEdit(!edit)
                                        setShowColorPicker(false)
                                        setShowCalendar(false)
                                    }
                                    if (todo.isDone) {
                                        markedTask()
                                    }
                                    if (edit) {
                                        handleEdit(e, todo._id)
                                    }
                                }}
                            >
                                {edit ? <MdDownloadDone /> : <AiFillEdit />}
                            </span>
                            <span
                                className="icon"
                                onClick={() => {
                                    handleDelete(todo._id)
                                    taskDeleted()
                                }}
                            >
                                <AiFillDelete />
                            </span>
                            <span
                                className="icon"
                                onClick={() => {
                                    if (!edit) {
                                        handleDone(todo._id)
                                    } else {
                                        editTaskOn()
                                    }
                                }}
                            >
                                {todo.isDone ? <MdRemoveDone /> : <MdDoneAll />}
                            </span>
                        </div>
                    </div>
                </form>
            )}
        </Draggable>
    )
}

export default SingleTodo
