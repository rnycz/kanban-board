import React, { useState, useEffect } from 'react'
import '../styles/styles.css'

type fetchData = {
    question: string
    punchline: string
}
const RandomJoke: React.FC = () => {
    const [data, setData] = useState<fetchData[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<null>(null)

    useEffect(() => {
        fetch('https://backend-omega-seven.vercel.app/api/getjoke')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `HTTP error: ${response.status} and that is not a joke`,
                    )
                }
                return response.json()
            })
            .then((newData) => {
                setData(newData)
                setError(null)
            })
            .catch((err) => {
                setError(err.message)
                setData([])
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])
    return (
        <div className="random-joke-container">
            <h3>Random Joke</h3>
            <div className="random-joke">
                {loading && <span>Loading a joke...</span>}
                {error && <span>{error}</span>}
                <div>
                    {data &&
                        data.map(({ question, punchline }) => (
                            <div key={data.length}>
                                {question}
                                <p>{punchline}</p>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default RandomJoke
