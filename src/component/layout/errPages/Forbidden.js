import React from 'react'
import HTTPErrorPage from './HTTPErrorPage'

export default function Forbidden() {
    return (
        <div>
            <HTTPErrorPage errCode={403} />
        </div>
    )
}
