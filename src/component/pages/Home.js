import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { toast } from 'react-toastify'

import { useMutation } from 'react-query'
import { checkinUser, checkoutUser } from '../../client/timeLog'

import Table from '../modules/table'

import { useUnfinishedTimeLog } from '../../hooks/timeLog'

function Home() {

    const [checkinInput, setCheckinInput] = useState("");

    const { data: unfinishedTimeLogs, isFetching, refetch: refreshTimeLogs } = useUnfinishedTimeLog();

    const [mutateCheckin] = useMutation(checkinUser);

    const handleCheckinSubmit = (e) => {
        e.preventDefault();
        let toastId = toast("Checkin...", { autoClose: false });
        mutateCheckin({ userName: checkinInput }, {
            onError: ({ error }) => {
                toast.update(toastId, { autoClose: 5000, type: toast.TYPE.ERROR, render: error });
            },
            onSuccess: () => {
                setCheckinInput("");
                toast.update(toastId, { autoClose: 5000, type: toast.TYPE.SUCCESS, render: "Done" });
                refreshTimeLogs();
            }
        });
    }

    const [mutateCheckout] = useMutation(checkoutUser);

    const handleCheckoutOnClick = (e) => {
        let toastId = toast("Checkout...", { autoClose: false });
        mutateCheckout({ userName: e.target.getAttribute("userid") }, {
            onError: ({ error }) => {
                toast.update(toastId, { autoClose: 5000, type: toast.TYPE.ERROR, render: error });
            },
            onSuccess: () => {
                toast.update(toastId, { autoClose: 5000, type: toast.TYPE.SUCCESS, render: "Done" });
                refreshTimeLogs();
            }
        })
    }

    const allUsers = [];
    const usersMap = {};

    return (
        <div className="container">
            <div className="row">
                <div className="col">
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
                    <form onSubmit={handleCheckinSubmit}>
                        <div className="input-group mb-3 mt-3">
                            <input type="text" className="form-control" name="studentId" placeholder="Students's Id" value={checkinInput} onChange={(e) => setCheckinInput(e.target.value)} />
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary">
                                    Checkin
                                    </button>
                                <Dropdown>
                                    <Dropdown.Toggle variant="outline-dark" split="true" style={{ borderTopLeftRadius: "0", borderBottomLeftRadius: "0", marginLeft: "-1px" }} />
                                    <Dropdown.Menu>
                                        {
                                            allUsers.map((user, i) => {
                                                return <Dropdown.Item key={i} value={user.UserName} onClick={() => { }}>{user.Name}</Dropdown.Item>;
                                            })
                                        }
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                    </form>

                    <Table
                        columns={[
                            {
                                Header: 'user',
                                accessor: 'userId',
                                isSortable: true,
                                Cell: ({ cell: { value } }) => String(usersMap[value] || value)
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
                                Cell: ({ cell: { value }, row: { original: { userId } } }) => {
                                    if (value > 0) {
                                        return new Date(value * 1000).toLocaleString()
                                    }
                                    else if (value === 0) {
                                        return <button className="btn btn-primary" onClick={handleCheckoutOnClick} userid={userId}>Checkout</button>
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

                        data={unfinishedTimeLogs || []}

                        search={true}

                        sort={{
                            sortBy: [
                                { id: "timeIn", desc: true }
                            ]
                        }}

                        loaded={!isFetching}
                    />
                </div>
            </div>
        </div>
    )
}

export default Home
