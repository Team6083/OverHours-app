import React, { Component } from 'react'

export class ErrorPage extends Component {

    render() {
        return (
            <div className="container">
                <div className="text-center mt-5">
                    <h1><span className={"badge badge-pill badge-" + (this.props.color ? this.props.color : "danger")}>{this.props.title}</span></h1>
                    <br></br>
                    {this.props.content}
                </div>
            </div>
        )
    }
}

export default ErrorPage
