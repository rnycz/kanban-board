import React, { useState } from 'react'
import './styles/styles.css'
import AddNewTask from './components/AddNewTask'
import TodoList from './components/TodoList'
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

    const pad = (num: number) => ('0' + num).slice(-2)
    const setDate = (date: Date) => {
        let day = date.getDate(),
            month = date.getMonth() + 1,
            year = date.getFullYear()
        return `${year}-${pad(month)}-${pad(day)}`
    }

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault()

        if (todoInput && color) {
            setTodos([
                ...todos,
                {
                    id: Date.now(),
                    todo: todoInput,
                    isDone: false,
                    color: color,
                    addDate: setDate(new Date()),
                    finishDate: setDate(finishTask),
                },
            ])
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

        let add,
            todo = todos,
            complete = completedTodos,
            doing = doingTodos
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
            todo.splice(destination.index, 0, add)
        } else if (destination.droppableId === 'TodosCompleted') {
            complete.splice(destination.index, 0, add)
        } else {
            doing.splice(destination.index, 0, add)
        }

        setCompletedTodos(complete)
        setDoingTodos(doing)
        setTodos(todo)
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="App">
                <span className="heading">Kanban Board</span>
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
