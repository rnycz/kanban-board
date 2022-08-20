import React, { useRef, useState } from 'react';
import "../styles/styles.css";
import { CirclePicker, ColorResult } from 'react-color';

interface Props{
    todoInput:string
    setTodoInput: React.Dispatch<React.SetStateAction<string>>
    handleAdd: (e: React.FormEvent) => void
    color: string
    setColor: React.Dispatch<React.SetStateAction<string>>
}

const InputField: React.FC<Props> = ({todoInput, setTodoInput, handleAdd, color, setColor}: Props) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [showColorPicker, setShowColorPicker] = useState<boolean>(false)

    const handleChangeColor = (color: ColorResult) =>{
      setColor(color.hex)
    }

  return (
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
        <div className="input-color-container" onClick={() => setShowColorPicker(!showColorPicker)}
        style={{backgroundColor: color}} >
        Task Color
          {
            showColorPicker ? <CirclePicker className="input-color" 
            onChange={handleChangeColor} /> : null
          }
        </div>
        <button className="input-submit" type="submit">ADD</button>
    </form>
  )
}

export default InputField