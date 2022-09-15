import React, { useState, useEffect } from 'react'
import './styles/styles.css'
import AddNewTask from './components/AddNewTask'
import TodoList from './components/TodoList'
import Sidebar from './components/Sidebar'
import OfflineModeInfo from './components/OfflineModeInfo'
import { Todo, addTaskError } from './model'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'react-calendar/dist/Calendar.css'

const App: React.FC = () => {
    const [todoInput, setTodoInput] = useState<string>('')
    const [todos, setTodos] = useState<Todo[]>([])
    const [completedTodos, setCompletedTodos] = useState<Todo[]>([])
    const [doingTodos, setDoingTodos] = useState<Todo[]>([])
    const [color, setColor] = useState<string>('')
    const [finishTask, setFinishTask] = useState<Date>(new Date())
    const [showOptions, setShowOptions] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<null>(null)
    const [online, setOnline] = useState<boolean>(true)

    const pad = (num: number) => ('0' + num).slice(-2)
    const setDate = (date: Date) => {
        let day = date.getDate(),
            month = date.getMonth() + 1,
            year = date.getFullYear()
        return `${year}-${pad(month)}-${pad(day)}`
    }

    useEffect(() => {
        fetch('http://localhost:3001/tasks')
            .then((response: Response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`)
                }
                return response.json()
            })
            .then((newData: any) => {
                setError(null)
                setOnline(true)
                setTodos(newData)
                setCompletedTodos(newData)
                setDoingTodos(newData)
            })
            .catch((err: any) => {
                setOnline(false)
                setError(err.message)
                setTodos([...todos])
            })
            .finally(() => {
                setLoading(false)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result
        if (!destination) return
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        )
            return

        let requestOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: 'todo',
            }),
        }

        let add: Todo,
            todo: Todo[] = todos,
            complete: Todo[] = completedTodos,
            doing: Todo[] = doingTodos
        if (source.droppableId === 'TodosList') {
            add = todo[source.index]
            todo.splice(source.index, 1)
        } else if (source.droppableId === 'TodosCompleted') {
            add = complete[source.index]
            complete.splice(source.index, 1)
        } else {
            add = doing[source.index]
            doing.splice(source.index, 1)
        }

        if (destination.droppableId === 'TodosList') {
            if (online) {
                requestOptions = {
                    ...requestOptions,
                    body: JSON.stringify({
                        type: 'todo',
                    }),
                }
                fetch('http://localhost:3001/tasks/' + add._id, requestOptions)
                    .then((response: Response) => {
                        return response.json()
                    })
                    .then((result: any) => {
                        todo.splice(destination.index, 0, result)
                        setTodos([...todo])
                    })
                    .catch((error: Error) => console.log('error: ', error))
            } else {
                todo.splice(destination.index, 0, add)
            }
        } else if (destination.droppableId === 'TodosCompleted') {
            if (online) {
                requestOptions = {
                    ...requestOptions,
                    body: JSON.stringify({
                        type: 'completed',
                    }),
                }
                fetch('http://localhost:3001/tasks/' + add._id, requestOptions)
                    .then((response: Response) => {
                        return response.json()
                    })
                    .then((result: any) => {
                        complete.splice(destination.index, 0, result)
                        setCompletedTodos([...complete])
                    })
                    .catch((error: Error) => console.log('error: ', error))
            } else {
                complete.splice(destination.index, 0, add)
            }
        } else {
            if (online) {
                requestOptions = {
                    ...requestOptions,
                    body: JSON.stringify({
                        type: 'doing',
                    }),
                }
                fetch('http://localhost:3001/tasks/' + add._id, requestOptions)
                    .then((response: Response) => {
                        return response.json()
                    })
                    .then((result: any) => {
                        doing.splice(destination.index, 0, result)
                        setDoingTodos([...doing])
                    })
                    .catch((error: Error) => console.log('error: ', error))
            } else {
                doing.splice(destination.index, 0, add)
            }
        }
        if (!online) {
            setCompletedTodos(
                complete.map((todo) =>
                    todo._id === add._id
                        ? { ...todo, type: 'completed' }
                        : todo,
                ),
            )
            setDoingTodos(
                doing.map((todo) =>
                    todo._id === add._id ? { ...todo, type: 'doing' } : todo,
                ),
            )
            setTodos(
                todo.map((todo) =>
                    todo._id === add._id ? { ...todo, type: 'todo' } : todo,
                ),
            )
        }
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="App">
                <Sidebar online={online} />
                <AddNewTask
                    todoInput={todoInput}
                    setTodoInput={setTodoInput}
                    handleAdd={handleAdd}
                    color={color}
                    setColor={setColor}
                    finishTask={finishTask}
                    setFinishTask={setFinishTask}
                    showOptions={showOptions}
                    setShowOptions={setShowOptions}
                />
                <TodoList
                    todos={todos}
                    setTodos={setTodos}
                    completedTodos={completedTodos}
                    setCompletedTodos={setCompletedTodos}
                    doingTodos={doingTodos}
                    setDoingTodos={setDoingTodos}
                    online={online}
                />
                <OfflineModeInfo
                    loading={loading}
                    error={error}
                    online={online}
                />
                <ToastContainer
                    newestOnTop={true}
                    pauseOnFocusLoss={false}
                    position={'top-right'}
                    autoClose={2000}
                    hideProgressBar={false}
                    closeOnClick={true}
                    pauseOnHover={true}
                    draggable={true}
                />
            </div>
        </DragDropContext>
    )
}

export default App
