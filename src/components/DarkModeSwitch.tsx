import '../styles/styles.css'
import { ChangeEventHandler } from 'react'

const DarkModeSwitch: React.FC = () => {
    const setDark = () => {
        localStorage.setItem('theme', 'dark')
        document.documentElement.setAttribute('data-theme', 'dark')
    }
    const setLight = () => {
        localStorage.setItem('theme', 'light')
        document.documentElement.setAttribute('data-theme', 'light')
    }
    const storeTheme: string | null = localStorage.getItem('theme')

    const prefersDark =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches

    const defaultDark =
        storeTheme === 'dark' || (storeTheme === null && prefersDark)

    if (defaultDark) {
        setDark()
    }

    const toggleTheme: ChangeEventHandler<HTMLInputElement> = (e) => {
        if (e.target.checked) {
            setDark()
        } else {
            setLight()
        }
    }
    return (
        <div className="toggle-theme-wrapper">
            <h3>Toggle between dark and light mode for card task</h3>
            <div className="toggle-theme-container">
                <span>☀️</span>
                <label className="toggle-theme">
                    <input
                        type="checkbox"
                        className="toggle-input"
                        onChange={toggleTheme}
                        defaultChecked={defaultDark}
                    />
                    <div className="slider"></div>
                </label>
                <span>🌒</span>
            </div>
        </div>
    )
}

export default DarkModeSwitch
