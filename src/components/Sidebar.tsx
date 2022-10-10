import React, { useState } from 'react'
import '../styles/styles.css'
import DarkModeSwitch from './DarkModeSwitch'
import RandomJoke from './RandomJoke'
import { links } from '../data/data'
import { FaBars } from 'react-icons/fa'
import { VscChromeClose } from 'react-icons/vsc'
import { GoPrimitiveDot } from 'react-icons/go'
import { useStateContext } from '../contexts/ContextProvider'
import { NavLink } from 'react-router-dom'

const Sidebar: React.FC = () => {
    const { online } = useStateContext()
    const [sidebar, setSidebar] = useState<boolean>(false)

    return (
        <>
            <div className="topbar">
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
                    <div className="links-container">
                        {links.map((link) => (
                            <NavLink
                                to={`/${link.name}`}
                                key={link.name}
                                onClick={() => setSidebar(!sidebar)}
                                className={({ isActive }) =>
                                    isActive ? 'link-active' : ''
                                }
                            >
                                <span className="link-icon">{link.icon}</span>
                                <span className="link-name">
                                    {link.name.replace('-', ' ')}
                                </span>
                            </NavLink>
                        ))}
                    </div>
                    <div className="status-info">
                        <span>
                            <GoPrimitiveDot
                                className={
                                    online ? 'online-icon' : 'offline-icon'
                                }
                            />
                            {online ? 'Online' : 'Offline'}
                        </span>
                    </div>
                </div>
                <div className="copyrights">
                    Created by{' '}
                    <a
                        href="https://github.com/rnycz"
                        target="_blank"
                        rel="noreferrer"
                    >
                        rnycz
                    </a>{' '}
                    {new Date().getFullYear()}
                </div>
            </nav>
        </>
    )
}

export default Sidebar
