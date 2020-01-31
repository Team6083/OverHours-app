import React from 'react'
import HTTPErrorPage from './HTTPErrorPage'

export default function Unauthorized() {
    return (
        <div>
            <HTTPErrorPage errCode={401} />
        </div>
    )
}
