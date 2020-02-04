import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Table from '../modules/table'
import { getUsers } from '../../client/user'

export class User extends Component {

    state = {
        allUsers: [],
        loaded: false
    }

    componentDidMount = () => {
        getUsers()
            .then((r) => r.json())
            .then((res) => {
                if (res) {
                    this.setState({
                        allUsers: res,
                        loaded: true
                    })
                }
            })
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row justify-content-lg-center">
                    <div className="col-lg-8 col">
                        <div className="row mb-3">
                            <div className="col">
                                <Link to="/users/edit/new" className="btn btn-sm btn-primary">New User</Link>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <Table
                                    columns={[
                                        {
                                            Header: 'id',
                                            accessor: 'Id',
                                            isSortable: true
                                        },
                                        {
                                            Header: 'userName',
                                            accessor: 'userName',
                                            isSortable: true,
                                            Cell: ({ cell: { value }, row: { original: { Id } } }) => {
                                                return <Link className="text-dark" to={"/users/edit/" + Id}>{value}</Link>
                                            }
                                        },
                                        {
                                            Header: 'name',
                                            accessor: 'name',
                                            isSortable: true
                                        },
                                        {
                                            Header: 'email',
                                            accessor: 'email',
                                            isSortable: true
                                        },
                                        {
                                            Header: 'pLevel',
                                            accessor: 'permissionLevel',
                                            isSortable: true
                                        },
                                        {
                                            Header: 'firstYear',
                                            accessor: 'firstYear',
                                            isSortable: true
                                        },
                                        {
                                            Header: 'graduationYear',
                                            accessor: 'graduationYear',
                                            isSortable: true,
                                        },
                                        {
                                            Header: 'passwordNeedChange',
                                            accessor: 'passwordNeedChange',
                                            isSortable: true,
                                        },
                                    ]}

                                    data={this.state.allUsers}

                                    hiddenColumns={[
                                        "Id",
                                        "graduationYear",
                                        "passwordNeedChange"
                                    ]}

                                    search={true}

                                    pagination={true}

                                    sort={{
                                        sortBy: [
                                            { id: "userName", desc: false }
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

export default User
