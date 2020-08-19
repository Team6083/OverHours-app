import React, { useState, useEffect } from 'react'

import { useStatUsers } from '../../../hooks/stat'
import { useSeasonIds } from '../../../hooks/timeLog'
import Table from '../../modules/table'
import { secondToString } from '../../modules/util'

function Leaderboard() {

    const [selectedSeason, setSelectedSeason] = useState("");

    const { data: statUsers, isFetching: statUsersIsFetching } = useStatUsers(selectedSeason);
    const { data: seasonIds, isFetching: seasonIdsIsFetching } = useSeasonIds();

    useEffect(() => {
        if (statUsers) setSelectedSeason(statUsers.seasonId);
    }, [statUsers]);

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="text-center">
                        <h4>You are No. <span className="badge badge-info badge-pill">{"1"}</span></h4>

                        <p>You spent <span className="badge badge-dark">{"..."}</span> on <span
                            className="badge badge-primary">{"season name"}</span>.</p>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col btn-bar">

                        </div>
                        <div className="col-md-6 col text-md-right">
                            <select className="rounded-select" value={selectedSeason}
                                onChange={(e) => setSelectedSeason(e.target.value)}>
                                {
                                    !seasonIdsIsFetching && seasonIds ? seasonIds.filter((v) => v.search("m:") !== 0).map((v) => {
                                        return <option key={v}>{v}</option>
                                    }) : null
                                }
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <div style={{ overflowX: "scroll" }}>
                        <Table
                            columns={[
                                {
                                    Header: 'ranking',
                                    accessor: 'ranking',
                                    isSortable: true
                                },
                                {
                                    Header: 'user',
                                    accessor: 'userId',
                                    isSortable: true
                                },
                                {
                                    Header: 'total time',
                                    accessor: 'totalTime',
                                    Cell: ({ cell: { value } }) => secondToString(value)
                                }
                            ]}

                            data={((statUsers && statUsers.users) || []).sort((a, b) => b.totalTime - a.totalTime).map((v, i) => {
                                return {
                                    ...v,
                                    ranking: i + 1
                                }
                            })}

                            pagination={true}

                            search={true}

                            sort={{
                                sortBy: [
                                    { id: "ranking", desc: false }
                                ]
                            }}

                            loaded={!statUsersIsFetching}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Leaderboard
