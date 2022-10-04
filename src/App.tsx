import React, { useEffect } from 'react'
import './styles/styles.css'
import AddNewTask from './components/AddNewTask'
import TodoList from './components/TodoList'
import Sidebar from './components/Sidebar'
import OfflineModeInfo from './components/OfflineModeInfo'
import { Todo } from './model'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'react-calendar/dist/Calendar.css'
import { useStateContext } from './contexts/ContextProvider'

const App: React.FC = () => {
    const {
        todos,
        setTodos,
        completedTodos,
        setCompletedTodos,
        doingTodos,
        setDoingTodos,
        setLoading,
        setError,
        online,
        setOnline,
    } = useStateContext()

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
                <Sidebar />
                <AddNewTask />
                <TodoList />
                <OfflineModeInfo />
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
