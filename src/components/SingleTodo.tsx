import React, { useEffect, useRef, useState } from 'react';
import { Todo } from "../model";
import {AiFillEdit, AiFillDelete} from "react-icons/ai";
import {MdDoneAll, MdRemoveDone} from "react-icons/md";
import "../styles/styles.css"
import { Draggable } from "react-beautiful-dnd";

interface Props {
    index: number
    todo: Todo
    todos: Todo[]
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const SingleTodo: React.FC<Props> = ({index, todo, todos, setTodos}: Props) => {

    const [edit, setEdit] = useState<boolean>(false)
    const [editTodo, setEditTodo] = useState<string>(todo.todo)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() =>{
        inputRef.current?.focus()
    }, [edit])

    const handleDone = (id: number) =>{
        setTodos(todos.map((todo) => 
            todo.id === id ? {...todo, isDone: !todo.isDone} : todo
        ))
    }

    const handleDelete = (id: number) =>{
        setTodos(todos.filter((todo) => todo.id !== id))
    }

    const handleEdit = (e: React.FormEvent, id: number) =>{
        e.preventDefault();
        setTodos(todos.map((todo) =>(
            todo.id === id ? {...todo, todo: editTodo} : todo
        )))
        setEdit(false)
    }

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
        {
            (provided, snapshot) =>(
                    <form className={`single-todo ${snapshot.isDragging ? "drag-form" : ""}`} 
                        onSubmit={(e) => handleEdit(e, todo.id)}
                        {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        {
                            edit ? (
                                <div className="single-todo-container">
                                    <div className="single-todo-color" style={{backgroundColor: todo.color}}></div >
                                    <input value={editTodo} onChange={(e) => setEditTodo(e.target.value)} 
                                    className="single-todo-input" ref={inputRef} />
                                </div>
                            ):(
                                todo.isDone ? (
                                    <div className="single-todo-container">
                                        <div className="single-todo-color" style={{backgroundColor: todo.color}}></div >
                                        <s className="single-todo-text">{todo.todo}</s>
                                    </div>  
                                ):(
                                    <div className="single-todo-container">
                                        <div className="single-todo-color" style={{backgroundColor: todo.color}}></div >
                                        <span className="single-todo-text">{todo.todo}</span>
                                    </div>                              
                                )
                            )
                        }
                        <div className="icons-container">
                            <span className="icon" onClick={(e) =>{
                                if(!edit && !todo.isDone){
                                    setEdit(!edit)
                                }
                                if(edit){
                                    handleEdit(e, todo.id)
                                }
                                }} >
                                <AiFillEdit />
                            </span>
                            <span className="icon" onClick={() =>handleDelete(todo.id)}>
                                <AiFillDelete />
                            </span>
                            <span className="icon" onClick={() =>handleDone(todo.id)}>
                                {
                                    todo.isDone ? <MdRemoveDone /> : <MdDoneAll />
                                }                            
                            </span>
                        </div>
                    </form>
            )
        }
    </Draggable>
  )
}

export default SingleTodo