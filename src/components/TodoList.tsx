import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import '../styles/styles.css'
import SingleTodo from './SingleTodo'
import { useStateContext } from '../contexts/ContextProvider'

const TodoList: React.FC = () => {
    const {
        online,
        todos,
        setTodos,
        doingTodos,
        setDoingTodos,
        completedTodos,
        setCompletedTodos,
    } = useStateContext()
    return (
        <div className="container">
            <Droppable droppableId="TodosList">
                {(provided, snapshot) => (
                    <div
                        className={`todos ${
                            snapshot.isDraggingOver ? 'drag' : null
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
                                    online={online}
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
                            snapshot.isDraggingOver ? 'drag' : null
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
                                    online={online}
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
                            snapshot.isDraggingOver ? 'drag' : null
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
                                    online={online}
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
