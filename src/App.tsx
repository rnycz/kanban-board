import React, { useState } from 'react';
import './styles/styles.css';
import InputField from './components/InputField';
import TodoList from "./components/TodoList";
import {Todo} from "./model";
import {DragDropContext, DropResult} from "react-beautiful-dnd";

const App: React.FC = () => {

  const [todoInput, setTodoInput] = useState<string>("")
  const [todos, setTodos] = useState<Todo[]>([])
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])
  const [doingTodos, setDoingTodos] = useState<Todo[]>([])
  const [color, setColor] = useState<string>("#FFFFFF")

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if(todoInput){
      setTodos([...todos, 
        { id: Date.now(),
        todo: todoInput,
        isDone: false,
        color: color }])
      setTodoInput("")
    }
  }

  const onDragEnd = (result: DropResult) =>{
    const {source, destination} = result
    if(!destination) return
    if(destination.droppableId===source.droppableId && 
      destination.index===source.index) return
    
    let add, todo = todos, complete = completedTodos, doing = doingTodos
    if(source.droppableId === "TodosList"){
      add = todo[source.index]
      todo.splice(source.index, 1)
    }else if(source.droppableId === "TodosCompleted"){
      add = complete[source.index]
      complete.splice(source.index, 1)
    }else{
      add = doing[source.index]
      doing.splice(source.index, 1)
    }

    if(destination.droppableId === "TodosList"){
      todo.splice(destination.index, 0, add)
    }else if(destination.droppableId === "TodosCompleted"){
      complete.splice(destination.index, 0, add)
    }else{
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
        <InputField todoInput={todoInput}
        setTodoInput={setTodoInput}
        handleAdd={handleAdd}
        color={color}
        setColor={setColor} />
        <TodoList todos={todos} setTodos={setTodos} 
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
          doingTodos={doingTodos}
          setDoingTodos={setDoingTodos} />
      </div>
    </DragDropContext>
  );
}

export default App;
