
import React, { Fragment } from 'react'
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table'
import '../../css/dataTables.bootstrap4.css'

function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) {
    return (
        <label>
            Search:{' '}
            <input
                value={globalFilter || ''}
                onChange={e => {
                    setGlobalFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
                }}
                placeholder=""
                className="form-control form-control-sm"
            />
        </label>
    )
}

function Table({ columns, data, sort, pagination, search }) {
    const enableSort = !!sort;
    const enablePagination = !!pagination;
    const enableSearch = !!search;

    const paginationInitStates = {};
    if (enablePagination) {

        if (pagination.pageSize) paginationInitStates.pageSize = pagination.pageSize;
    }

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

        // for searching table
        preGlobalFilteredRows,
        setGlobalFilter,

        // for table pagination
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            filterTypes,
            initialState: {
                ...(enablePagination ? paginationInitStates : {})
            },
        },
        enableSearch ? useGlobalFilter : () => { },
        enableSort ? useSortBy : () => { },
        enablePagination ? usePagination : () => { }
    )

    let tbodyRows = enablePagination ? page : rows;

    const renderPaginationPages = () => {
        if (pageOptions.length > 7) {
            return (
                <Fragment>
                    {/* first page */}
                    <li className={"paginate_button page-item " + (pageIndex === 0 ? "active " : "")}>
                        <a href="#" onClick={() => gotoPage(0)} className="page-link">1</a>
                    </li>

                    {pageIndex > 3 ?
                        <li className="paginate_button page-item disabled" >
                            <a href="#" className="page-link">…</a>
                        </li> :
                        <Fragment>
                            {
                                [1, 2, 3, 4].map((k, i) =>
                                    <li key={i} className={"paginate_button page-item " + (pageIndex === k ? "active " : "")}>
                                        <a href="#" onClick={() => gotoPage(k)} className="page-link">{k + 1}</a>
                                    </li>
                                )
                            }
                        </Fragment>
                    }

                    {
                        pageIndex > 3 && pageIndex < pageOptions.length - 4 ?
                            <Fragment>
                                <li className={"paginate_button page-item"}>
                                    <a href="#" onClick={() => gotoPage(pageIndex - 1)} className="page-link">{pageIndex}</a>
                                </li>

                                <li className={"paginate_button page-item active"}>
                                    <a href="#" onClick={() => gotoPage(pageIndex)} className="page-link">{pageIndex + 1}</a>
                                </li>

                                <li className={"paginate_button page-item"}>
                                    <a href="#" onClick={() => gotoPage(pageIndex + 1)} className="page-link">{pageIndex + 2}</a>
                                </li>
                            </Fragment> : null
                    }

                    {pageIndex < pageOptions.length - 4 ?
                        <li className="paginate_button page-item disabled" >
                            <a href="#" className="page-link">…</a>
                        </li> :
                        <Fragment>
                            {
                                Array.from({ length: 4 }, (_, i) => pageOptions.length - 5 + i).map((k, i) =>
                                    <li key={i} className={"paginate_button page-item " + (pageIndex === k ? "active " : "")}>
                                        <a href="#" onClick={() => gotoPage(k)} className="page-link">{k + 1}</a>
                                    </li>
                                )
                            }
                        </Fragment>
                    }

                    {/* last page */}
                    <li className={"paginate_button page-item " + (pageIndex === (pageOptions.length - 1) ? "active " : "")}>
                        <a href="#" onClick={() => gotoPage(pageOptions.length - 1)} className="page-link">{pageOptions.length}</a>
                    </li>
                </Fragment>
            )
        } else {
            return [...pageOptions].map((_, i) => {
                return <li key={i} className={"paginate_button page-item " + (pageIndex === i ? "active " : "")}>
                    <a href="#" onClick={() => gotoPage(i)} className="page-link">{i + 1}</a>
                </li>
            });
        }
    }

    // Render the UI for your table
    return (
        <div className="dataTables_wrapper dt-bootstrap4">
            <div className="row">
                <div className="col-sm-12 col-md-6">
                    Count: <span>3</span>
                </div>
                <div className="col-sm-12 col-md-6">
                    <div className="dataTables_filter">
                        {enableSearch ? <GlobalFilter
                            preGlobalFilteredRows={preGlobalFilteredRows}
                            globalFilter={state.globalFilter}
                            setGlobalFilter={setGlobalFilter}
                        /> : null}
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
                                        const headerProps = enableSort ? column.getHeaderProps(column.getSortByToggleProps()) : column.getHeaderProps();

                                        let { className } = headerProps;
                                        className = (className ? className : "");

                                        if (enableSort && column.isSortable) {
                                            className += " " + (column.isSorted ? (column.isSortedDesc ? "sorting_desc" : "sorting_asc") : "sorting")
                                        }

                                        return (
                                            <th className={className}  {...headerProps}>
                                                {column.render('Header')}
                                            </th>
                                        )
                                    })}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {tbodyRows.map(
                                (row, i) => {
                                    prepareRow(row);
                                    return (
                                        <tr {...row.getRowProps()} key={i}>
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
                    <div className="dataTables_info" role="status" aria-live="polite">
                        <span>Showing {1 + (enablePagination ? pageIndex * pageSize : 0)} to {enablePagination ? ((pageIndex + 1) * pageSize > rows.length ? rows.length : (pageIndex + 1) * pageSize) : rows.length} of {rows.length} entries</span>
                        {enableSearch ? <span> (filtered from {data.length} total entries)</span> : null}
                    </div>
                </div>
                <div className="col-sm-12 col-md-7">
                    {
                        enablePagination ? <div className="dataTables_paginate paging_simple_numbers">
                            <ul className="pagination">
                                <li className={"paginate_button page-item previous " + (canPreviousPage ? "" : "disabled ")}>
                                    <a href="#" className="page-link" onClick={() => previousPage()}>Previous</a>
                                </li>
                                {renderPaginationPages()}
                                <li className={"paginate_button page-item next " + (canNextPage ? "" : "disabled ")}>
                                    <a href="#" onClick={() => nextPage()} className="page-link">Next</a>
                                </li>
                            </ul>
                        </div> : null
                    }
                </div>
            </div>
        </div>
    )
}

export default Table