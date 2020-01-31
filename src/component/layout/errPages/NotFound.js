import React from 'react'
import HTTPErrorPage from './HTTPErrorPage'

export default function NotFound() {
    return (
        <div>
            <HTTPErrorPage errCode={404} />
        </div>
    )
}
