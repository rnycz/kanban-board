import React from 'react'
import AddNewTask from '../components/AddNewTask'
import OfflineModeInfo from '../components/OfflineModeInfo'
import TodoList from '../components/TodoList'

const KanbanBoardPage: React.FC = () => {
    return (
        <>
            <AddNewTask />
            <TodoList />
            <OfflineModeInfo />
        </>
    )
}

export default KanbanBoardPage
