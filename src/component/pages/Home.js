import React, { Component } from 'react'
import { Dropdown } from 'react-bootstrap'
import Table from '../modules/table'

export class Home extends Component {
    state = {
        checkinInput: "",
        allUsers: [],

    }

    handleCheckinOnClick(e) {

    }

    handleCheckinSelectOnClick = (e) => {
        this.setState({
            checkinInput: e.target.getAttribute("value")
        })
    }

    render() {

        return (
            <div className="container-fluid">
                <div className="row justify-content-md-center">
                    <div className="col-md-8 col">
                        <h2>Team 6083 - OverHours</h2>
                        <h4>
                            <div className="row">
                                <div className="col-auto mb-1">
                                    Current login: <span className="badge badge-dark">n/a</span>
                                </div>
                                /
                                <div className="col-auto mb-1">
                                    Season: <span className="badge badge-primary badge-pill">n/a</span>
                                </div>
                            </div>
                        </h4>
                        <form>
                            <div className="input-group mb-3 mt-3">
                                <input type="text" className="form-control" name="studentId" placeholder="Students's Id" value={this.state.checkinInput} onChange={(e) => this.setState({ checkinInput: e.target.value })} />
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary" type="button" onClick={this.handleCheckinOnClick}>
                                        Checkin
                                    </button>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="outline-dark" split="true" style={{ borderTopLeftRadius: "0", borderBottomLeftRadius: "0", marginLeft: "-1px" }} />
                                        <Dropdown.Menu>
                                            {
                                                this.state.allUsers.map((user, i) => {
                                                    return <Dropdown.Item key={i} value={user.UserName} onClick={this.handleCheckinSelectOnClick}>{user.Name}</Dropdown.Item>;
                                                })
                                            }
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="row mt-4 justify-content-lg-center">
                    <div className="col-lg-8 col">
                        <Table columns={[
                            {
                                Header: 'Age',
                                accessor: 'age',
                                isSortable: true,
                            },
                            {
                                Header: 'Visits',
                                accessor: 'visits',
                                isSortable: true,
                            },
                            {
                                Header: 'Status',
                                accessor: 'status',
                                isSortable: true,
                            },
                            {
                                Header: 'Profile Progress',
                                accessor: 'progress',
                                isSortable: true,
                            }
                        ]} data={[]} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Home
