import React, { useState, useEffect } from 'react'
import './styles/styles.css'
import AddNewTask from './components/AddNewTask'
import TodoList from './components/TodoList'
import Sidebar from './components/Sidebar'
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
                setTodos(newData)
                setCompletedTodos(newData)
                setDoingTodos(newData)
            })
            .catch((err: any) => {
                setError(err.message)
                setTodos([...todos])
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault()

        if (todoInput && color) {
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
                    setTodos([...todos])
                })
                .catch((error: Error) => console.log('error: ', error))
        } else if (destination.droppableId === 'TodosCompleted') {
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
                    setCompletedTodos([...completedTodos])
                })
                .catch((error: Error) => console.log('error: ', error))
        } else {
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
                    setDoingTodos([...doingTodos])
                })
                .catch((error: Error) => console.log('error: ', error))
        }
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="App">
                <Sidebar />
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
                />
                {loading && <span>Loading tasks...</span>}
                {error && (
                    <span>Try again! Check the connection to the server</span>
                )}
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
