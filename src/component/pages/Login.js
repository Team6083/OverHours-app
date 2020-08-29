import React, { useState } from 'react'
import { Dropdown, DropdownButton, InputGroup, FormControl } from 'react-bootstrap'

import { login } from '../../client/auth'
import { toast } from 'react-toastify';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    return (
        <div className="container">
            <h1>Login</h1>
            <div className="row">
                <div className="col-8">
                    <form onSubmit={(e) => {
                        e.preventDefault();

                        if (!username || !password) {
                            toast.warn("Please fill in username and password.\n請輸入帳號與密碼");
                            return;
                        }

                        login(username, password).then((r) => r.json()).then((data) => {
                            if (data.error) {
                                toast.warn(data.error);
                            } else {
                                if (data.token_string) {

                                }
                            }
                        }).catch((err) => {
                            toast.error(err.message);
                        });
                    }}>
                        <div className="form-group">
                            <label htmlFor="usernameInput">User Name</label>
                            <InputGroup>
                                <FormControl type="text" id="usernameInput" placeholder="Enter user name"
                                    value={username} onChange={(e) => setUsername(e.target.value)} />
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
                                value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="rememberMe"
                                checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
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

export default Login
