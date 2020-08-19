import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Table from '../../modules/table'
import { getTimeLogs } from '../../../client/timeLog'

export class TimeLog extends Component {

    state = {
        allTimeLog: [],
        usersMap: {},
        loaded: false
    }

    componentDidMount = () => {
        getTimeLogs()
            .then((r) => r.json())
            .then((res) => {
                this.setState({
                    allTimeLog: res,
                    loaded: true
                })
            })
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row justify-content-lg-center">
                    <div className="col-lg-8 col">
                        <div className="row mb-3">
                            <div className="col">
                                <Link to="/timeLogs/edit/new" className="btn btn-sm btn-primary">New TimeLog</Link>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <Table
                                    columns={[
                                        {
                                            Header: 'Id',
                                            accessor: 'Id',
                                            isSortable: true,
                                            Cell: ({ cell: { value } }) => {
                                                return <Link className="text-dark" to={"/timeLogs/edit/" + value}>{value}</Link>
                                            }
                                        },
                                        {
                                            Header: 'user',
                                            accessor: 'userId',
                                            isSortable: true,
                                            Cell: ({ cell: { value } }) => String(this.state.usersMap[value] || value)
                                        },
                                        {
                                            Header: 'time in',
                                            accessor: 'timeIn',
                                            isSortable: true,
                                            Cell: ({ cell: { value } }) => new Date(value * 1000).toLocaleString()
                                        },
                                        {
                                            Header: 'time out',
                                            accessor: 'timeOut',
                                            isSortable: true,
                                            Cell: ({ cell: { value } }) => {
                                                if (value > 0) {
                                                    return new Date(value * 1000).toLocaleString()
                                                }
                                                else if (value === 0) {
                                                    return "Current In"
                                                }
                                                return value
                                            }
                                        },
                                        {
                                            Header: 'season',
                                            accessor: 'seasonId',
                                            isSortable: true,
                                        }
                                    ]}

                                    data={this.state.allTimeLog}

                                    pagination={true}

                                    search={true}

                                    sort={{
                                        sortBy: [
                                            { id: "timeOut", desc: true },
                                            { id: "timeIn", desc: true }
                                        ]
                                    }}

                                    loaded={this.state.loaded}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TimeLog
