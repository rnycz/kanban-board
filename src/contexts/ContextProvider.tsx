import React, { createContext, ReactNode, useContext, useState } from 'react'
import { Todo } from '../model'

type Props = {
    children?: ReactNode
}
type ContextState = {
    todos: Todo[]
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
    completedTodos: Todo[]
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
    doingTodos: Todo[]
    setDoingTodos: React.Dispatch<React.SetStateAction<Todo[]>>
    todoInput: string
    setTodoInput: React.Dispatch<React.SetStateAction<string>>
    color: string
    setColor: React.Dispatch<React.SetStateAction<string>>
    finishTask: Date
    setFinishTask: React.Dispatch<React.SetStateAction<Date>>
    showOptions: boolean
    setShowOptions: React.Dispatch<React.SetStateAction<boolean>>
    loading: boolean
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    error: null
    setError: React.Dispatch<React.SetStateAction<null>>
    online: boolean
    setOnline: React.Dispatch<React.SetStateAction<boolean>>
}

const contextDefaultValues: ContextState = {
    todos: [],
    setTodos: () => {},
    completedTodos: [],
    setCompletedTodos: () => {},
    doingTodos: [],
    setDoingTodos: () => {},
    todoInput: '',
    setTodoInput: () => {},
    color: '',
    setColor: () => {},
    finishTask: new Date(),
    setFinishTask: () => {},
    showOptions: false,
    setShowOptions: () => {},
    loading: true,
    setLoading: () => {},
    error: null,
    setError: () => {},
    online: true,
    setOnline: () => {},
}

export const StateContext = createContext<ContextState>(contextDefaultValues)

export const ContextProvider: React.FC<Props> = ({ children }) => {
    const [todos, setTodos] = useState<Todo[]>(contextDefaultValues.todos)
    const [completedTodos, setCompletedTodos] = useState<Todo[]>(
        contextDefaultValues.completedTodos,
    )
    const [doingTodos, setDoingTodos] = useState<Todo[]>(
        contextDefaultValues.doingTodos,
    )
    const [todoInput, setTodoInput] = useState<string>(
        contextDefaultValues.todoInput,
    )
    const [color, setColor] = useState<string>(contextDefaultValues.color)
    const [finishTask, setFinishTask] = useState<Date>(
        contextDefaultValues.finishTask,
    )
    const [showOptions, setShowOptions] = useState<boolean>(
        contextDefaultValues.showOptions,
    )
    const [loading, setLoading] = useState<boolean>(
        contextDefaultValues.loading,
    )
    const [error, setError] = useState<null>(contextDefaultValues.error)
    const [online, setOnline] = useState<boolean>(contextDefaultValues.online)
    return (
        <StateContext.Provider
            value={{
                todos,
                setTodos,
                completedTodos,
                setCompletedTodos,
                doingTodos,
                setDoingTodos,
                todoInput,
                setTodoInput,
                color,
                setColor,
                finishTask,
                setFinishTask,
                loading,
                setLoading,
                error,
                setError,
                online,
                setOnline,
                showOptions,
                setShowOptions,
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)
