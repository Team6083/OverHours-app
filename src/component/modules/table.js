
import React from 'react'
import { useTable, useSortBy, useGlobalFilter } from 'react-table'
import '../../css/dataTables.bootstrap4.css'

function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) {
    const count = preGlobalFilteredRows.length

    return (
        <label>
            Search:{' '}
            <input
                value={globalFilter || ''}
                onChange={e => {
                    setGlobalFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
                }}
                placeholder={`${count} records...`}
                className="form-control form-control-sm"
            />
        </label>
    )
}

function Table({ columns, data }) {
    const filterTypes = React.useMemo(
        () => ({
            text: (rows, id, filterValue) => {
                return rows.filter(row => {
                    const rowValue = row.values[id]
                    return rowValue !== undefined
                        ? String(rowValue)
                            .toLowerCase()
                            .startsWith(String(filterValue).toLowerCase())
                        : true
                })
            },
        }),
        []
    )

    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        preGlobalFilteredRows,
        setGlobalFilter
    } = useTable(
        {
            columns,
            data,
            filterTypes
        },
        useGlobalFilter,
        useSortBy
    )

    // Render the UI for your table
    return (
        <div className="dataTables_wrapper dt-bootstrap4">
            <div className="row">
                <div className="col-sm-12 col-md-6">
                    Count: <span>3</span>
                </div>
                <div className="col-sm-12 col-md-6">
                    <div className="dataTables_filter">
                        <GlobalFilter
                            preGlobalFilteredRows={preGlobalFilteredRows}
                            globalFilter={state.globalFilter}
                            setGlobalFilter={setGlobalFilter}
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12">
                    <table className="table table-hover dataTable no-footer" {...getTableProps()}>
                        <thead>
                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => {
                                        let { className } = column.getHeaderProps();
                                        className = (className ? className : "");

                                        if (column.isSortable) {
                                            className += " " + (column.isSorted ? (column.isSortedDesc ? "sorting_desc" : "sorting_asc") : "sorting")
                                        }

                                        return (
                                            <th className={className}  {...column.getHeaderProps(column.getSortByToggleProps())}>
                                                {column.render('Header')}
                                            </th>
                                        )
                                    })}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {rows.map(
                                (row, i) => {
                                    prepareRow(row);
                                    return (
                                        <tr {...row.getRowProps()}>
                                            {row.cells.map(cell => {
                                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                            })}
                                        </tr>
                                    )
                                }
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12 col-md-5">
                    <div className="dataTables_info" id="timeLogsTable_info" role="status" aria-live="polite">Showing 1 to 3 of 3 entries</div>
                </div>
                <div className="col-sm-12 col-md-7"></div></div>
        </div>
    )
}

export default Table