import React, { useRef } from 'react';
import "../styles/styles.css";
import { CirclePicker, ColorResult } from 'react-color';
import { colors } from "../model";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {ImCross} from "react-icons/im";

interface Props{
    todoInput:string
    setTodoInput: React.Dispatch<React.SetStateAction<string>>
    handleAdd: (e: React.FormEvent) => void
    color: string
    setColor: React.Dispatch<React.SetStateAction<string>>
    finishTask: Date
    setFinishTask: React.Dispatch<React.SetStateAction<Date>>
    setDate: (date: Date) => string
    showOptions: boolean
    setShowOptions: React.Dispatch<React.SetStateAction<boolean>>
}

const AddNewTask: React.FC<Props> = ({todoInput, setTodoInput, handleAdd, color, setColor,
    finishTask, setFinishTask, setDate, showOptions, setShowOptions}: Props) => {

    const inputRef = useRef<HTMLInputElement>(null)

    const onChange = (newDate: React.SetStateAction<Date>) =>{
      setFinishTask(newDate);
    }

    const handleChangeColor = (color: ColorResult) =>{
      setColor(color.hex)
    }

  return (
    <div className="task-container">
      <button className="task-modal-button" onClick={() => setShowOptions(!showOptions)}>
        Add New Task
      </button>
      {
        showOptions ? 
          <div className="task-modal">
            <span className="close-modal" onClick={() => setShowOptions(!showOptions)}>
              <ImCross />
            </span>
            <form className="input" 
            onSubmit={(e) => {
                    handleAdd(e)
                    inputRef.current?.blur()
                }} >
                <input type="input" placeholder="Enter a task" className="input-box"
                ref={inputRef} 
                value={todoInput}
                onChange={
                    (e)=>setTodoInput(e.target.value)
                } />
                <button className="input-submit" type="submit">ADD</button>
            </form>
            <div className="options-container">
              <div className="input-color-container">
                <CirclePicker className="input-color" colors={colors}
                  onChange={handleChangeColor} />
                <span className="task-color" style={{ backgroundColor: color }}>Task Color</span>
                <span className="task-finish">Deadline: {setDate(finishTask)}</span>
              </div>
              <Calendar className="calendar"
                onChange={onChange}
              value={finishTask} />
            </div>
          </div>
        : null
      }
    </div>
  )
}

export default AddNewTask