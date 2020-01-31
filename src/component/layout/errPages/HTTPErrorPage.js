import React, { Component } from 'react'
import ErrorPage from './ErrorPage'

export class HTTPErrorPage extends Component {

    httpErrors = {
        401: {
            title: "401 Unauthorized",
            content: "You have to login to continue"
        },
        403: {
            title: "403 Forbidden",
            content: "You don't have the permission to check the page you are looking for"
        },
        404: {
            title: "404 NOT FOUND",
            content: "We can't fund the page you are looking for (;﹏;)"
        },
        API_FAIL: {
            title: "API Connection Fail",
            content: "Fail to connect API..."
        }
    }

    getErrorTitle(code) {
        if (this.httpErrors[code]) {
            return this.httpErrors[code].title;
        }

        return "HTTP ERROR: " + code;
    }

    getErrorContent(code) {
        if (this.httpErrors[code]) {
            return this.httpErrors[code].content;
        }

        return "";
    }

    render() {
        return (
            <ErrorPage title={this.getErrorTitle(this.props.errCode)} message={(<h4>{this.getErrorContent(this.props.errCode)}</h4>)} />
        )
    }
}

export default HTTPErrorPage
