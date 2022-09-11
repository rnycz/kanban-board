import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { Todo } from '../model'
import '../styles/styles.css'
import SingleTodo from './SingleTodo'

interface Props {
    todos: Todo[]
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
    completedTodos: Todo[]
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
    doingTodos: Todo[]
    setDoingTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList: React.FC<Props> = ({
    todos,
    setTodos,
    completedTodos,
    setCompletedTodos,
    doingTodos,
    setDoingTodos,
}: Props) => {
    return (
        <div className="container">
            <Droppable droppableId="TodosList">
                {(provided, snapshot) => (
                    <div
                        className={`todos ${
                            snapshot.isDraggingOver ? 'drag' : ''
                        }`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <span className="todos-heading">ToDo Tasks</span>
                        {todos.map((todo, index) =>
                            todo.type === 'todo' ? (
                                <SingleTodo
                                    key={todo._id}
                                    index={index}
                                    todo={todo}
                                    todos={todos}
                                    setTodos={setTodos}
                                />
                            ) : null,
                        )}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <Droppable droppableId="TodosDoing">
                {(provided, snapshot) => (
                    <div
                        className={`todos doing ${
                            snapshot.isDraggingOver ? 'drag' : ''
                        }`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <span className="todos-heading">In Progress Tasks</span>
                        {doingTodos.map((todo, index) =>
                            todo.type === 'doing' ? (
                                <SingleTodo
                                    key={todo._id}
                                    index={index}
                                    todo={todo}
                                    todos={doingTodos}
                                    setTodos={setDoingTodos}
                                />
                            ) : null,
                        )}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <Droppable droppableId="TodosCompleted">
                {(provided, snapshot) => (
                    <div
                        className={`todos completed ${
                            snapshot.isDraggingOver ? 'drag' : ''
                        }`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <span className="todos-heading">Completed Tasks</span>
                        {completedTodos.map((todo, index) =>
                            todo.type === 'completed' ? (
                                <SingleTodo
                                    key={todo._id}
                                    index={index}
                                    todo={todo}
                                    todos={completedTodos}
                                    setTodos={setCompletedTodos}
                                />
                            ) : null,
                        )}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
}

export default TodoList
