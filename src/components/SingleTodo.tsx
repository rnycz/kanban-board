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
import { MdDoneAll, MdRemoveDone, MdDownloadDone } from 'react-icons/md'
import { GoDiffAdded } from 'react-icons/go'
import { FcExpired } from 'react-icons/fc'
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
}

const SingleTodo: React.FC<Props> = ({
    index,
    todo,
    todos,
    setTodos,
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

    const onChange = (newDate: React.SetStateAction<Date>) => {
        setEditDate(newDate)
        setShowCalendar(false)
    }

    useEffect(() => {
        inputRef.current?.focus()
    }, [edit])

    const handleDone = (id: number) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, isDone: !todo.isDone } : todo,
            ),
        )
    }

    const handleDelete = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id))
    }

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault()
        if (editTodo === '') {
            emptyTaskOnEdit()
        } else {
            setTodos(
                todos.map((todo) =>
                    todo.id === id
                        ? {
                              ...todo,
                              todo: editTodo,
                              color: editColor,
                              finishDate: displayEditDate,
                          }
                        : todo,
                ),
            )
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
        <Draggable draggableId={todo.id.toString()} index={index}>
            {(provided) => (
                <form
                    className="single-todo"
                    onSubmit={(e) => handleEdit(e, todo.id)}
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
                                <FcExpired
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
                                        onChange={onChange}
                                        value={editDate}
                                    />
                                ) : null}
                            </div>
                        ) : (
                            <span className="date">
                                <FcExpired className="date-icon" />
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
                        ) : todo.isDone ? (
                            <div className="single-todo-container done">
                                <div
                                    className="single-todo-color"
                                    style={{ backgroundColor: todo.color }}
                                ></div>
                                <span className="single-todo-text">
                                    {todo.todo}
                                </span>
                            </div>
                        ) : (
                            <div className="single-todo-container">
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
                                        handleEdit(e, todo.id)
                                    }
                                }}
                            >
                                {edit ? <MdDownloadDone /> : <AiFillEdit />}
                            </span>
                            <span
                                className="icon"
                                onClick={() => {
                                    handleDelete(todo.id)
                                    taskDeleted()
                                }}
                            >
                                <AiFillDelete />
                            </span>
                            <span
                                className="icon"
                                onClick={() => {
                                    if (!edit) {
                                        handleDone(todo.id)
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
