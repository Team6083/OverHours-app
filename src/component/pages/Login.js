import React, { Component } from 'react'
import { Dropdown, DropdownButton, InputGroup, FormControl } from 'react-bootstrap'

export class Login extends Component {

    state = {
        username: "",
        password: "",
        alertMessage: "",
        rememberMe: false
    }

    render() {
        return (
            <div className="container">
                <h1>Login</h1>

                <div className="row my-4">
                    <div className="col">
                        {
                            this.state.alertMessage ?
                                <div className="alert alert-warning" role="alert">
                                    <span>{this.state.alertMessage}</span>
                                </div> : null
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col-8">
                        <form method="post" action="/loginPost">
                            <div className="form-group">
                                <label htmlFor="usernameInput">User Name</label>
                                <InputGroup>
                                    <FormControl type="text" id="usernameInput" placeholder="Enter user name"
                                        value={this.state.username} onChange={(e) => {
                                            this.setState({
                                                username: e.target.value
                                            })
                                        }} />
                                    <InputGroup.Append>
                                        <DropdownButton title="Select your name" variant="outline-secondary">
                                            <Dropdown.Item>ABC</Dropdown.Item>
                                        </DropdownButton>
                                    </InputGroup.Append>
                                </InputGroup>
                                <small id="usernameHelp" className="form-text text-muted">Input your user name.</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="passwordInput">Password</label>
                                <input type="password" className="form-control" id="passwordInput" placeholder="Password"
                                    value={this.state.password} onChange={(e) => {
                                        this.setState({
                                            password: e.target.value
                                        })
                                    }} />
                            </div>
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="rememberMe"
                                    checked={this.state.rememberMe} onChange={(e) => {
                                        this.setState({
                                            rememberMe: e.target.checked
                                        })
                                    }} />
                                <label htmlFor="rememberMe" className="custom-control-label">Remember me</label>
                            </div>
                            <button type="submit" className="btn btn-primary mt-2">Submit</button>
                        </form>
                    </div>
                    <div className="col-4 text-center">
                        <h4>Sign in with</h4>
                        <div className="alert alert-info" role="alert">
                            <span>Building...</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login
