import React, { useState } from 'react'
import { ImCross } from 'react-icons/im'

interface Props {
    loading: boolean
    error: null
    online: boolean
}

const OfflineModeInfo: React.FC<Props> = ({
    loading,
    error,
    online,
}: Props) => {
    const [info, setInfo] = useState<boolean>(true)
    return (
        <>
            {loading && <span>Loading tasks...</span>}
            {!online && (
                <>
                    {info && (
                        <div className="offline-info">
                            {error && (
                                <>
                                    <div>
                                        <h3>ERROR - TRY AGAIN</h3>
                                        <span
                                            className="close-info"
                                            onClick={() => setInfo(!info)}
                                        >
                                            <ImCross />
                                        </span>
                                    </div>
                                    <div>
                                        Check the connection to the server or
                                        continue in offline mode, but if you
                                        close the application, the progress will
                                        not be saved.
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </>
            )}
        </>
    )
}

export default OfflineModeInfo
