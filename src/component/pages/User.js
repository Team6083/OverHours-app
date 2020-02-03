import React, { Component } from 'react'
import Table from '../modules/table'
import { getUsers } from '../../client/user'

export class User extends Component {

    state = {
        allUsers: [],
    }

    componentDidMount = () => {
        getUsers()
            .then((r) => r.json())
            .then((res) => {
                if(res){
                    this.setState({
                        allUsers: res
                    })
                }
            })
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row justify-content-lg-center">
                    <div className="col-lg-8 col">
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
                                    isSortable: true
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
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default User
