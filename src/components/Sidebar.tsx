import React, { useState } from 'react'
import '../styles/styles.css'
import DarkModeSwitch from './DarkModeSwitch'
import RandomJoke from './RandomJoke'
import { FaBars } from 'react-icons/fa'
import { VscChromeClose } from 'react-icons/vsc'

const Sidebar: React.FC = () => {
    const [sidebar, setSidebar] = useState<boolean>(false)

    return (
        <>
            <div className="sidebar">
                <FaBars
                    className="icon-bars"
                    onClick={() => setSidebar(!sidebar)}
                />
                <span className="heading">Kanban Board</span>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <VscChromeClose
                    className="navbar-close"
                    onClick={() => setSidebar(!sidebar)}
                />
                <div className="nav-menu-items">
                    <DarkModeSwitch />
                    <RandomJoke />
                </div>
                <div className="copyrights">
                    Created by{' '}
                    <a href="https://github.com/rnycz" target="_blank">
                        rnycz
                    </a>{' '}
                    {new Date().getFullYear()}
                </div>
            </nav>
        </>
    )
}

export default Sidebar
