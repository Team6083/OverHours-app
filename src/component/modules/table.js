
import React, { } from 'react'
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

function Table(props) {
    const { columns, data, sort, pagination, search } = props;

    // feature enable flags
    const enableSort = !!sort;
    const enablePagination = !!pagination;
    const enableSearch = !!search;

    const paginationInitStates = {};
    if (enablePagination) {
        if (pagination.pageSize) paginationInitStates.pageSize = pagination.pageSize;
    }

    const sortInitState = {};
    if (enableSort) {
        if (sort.sortBy) sortInitState.sortBy = sort.sortBy;
    }

    const text = props.text || {};

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
            initialState: {
                ...(enablePagination ? paginationInitStates : {}),
                ...(enableSort ? sortInitState : {}),
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
                <>
                    {/* first page */}
                    <li className={"paginate_button page-item " + (pageIndex === 0 ? "active " : "")}>
                        <button onClick={() => { gotoPage(0) }} className="page-link">1</button>
                    </li>

                    {pageIndex > 3 ?
                        <li className="paginate_button page-item disabled" >
                            <button className="page-link">…</button>
                        </li> :
                        <>
                            {
                                [1, 2, 3, 4].map((k, i) =>
                                    <li key={i} className={"paginate_button page-item " + (pageIndex === k ? "active " : "")}>
                                        <button onClick={() => gotoPage(k)} className="page-link">{k + 1}</button>
                                    </li>
                                )
                            }
                        </>
                    }

                    {
                        pageIndex > 3 && pageIndex < pageOptions.length - 4 ?
                            <>
                                <li className={"paginate_button page-item"}>
                                    <button onClick={() => gotoPage(pageIndex - 1)} className="page-link">{pageIndex}</button>
                                </li>

                                <li className={"paginate_button page-item active"}>
                                    <button onClick={() => gotoPage(pageIndex)} className="page-link">{pageIndex + 1}</button>
                                </li>

                                <li className={"paginate_button page-item"}>
                                    <button onClick={() => gotoPage(pageIndex + 1)} className="page-link">{pageIndex + 2}</button>
                                </li>
                            </> : null
                    }

                    {pageIndex < pageOptions.length - 4 ?
                        <li className="paginate_button page-item disabled" >
                            <button className="page-link">…</button>
                        </li> :
                        <>
                            {
                                Array.from({ length: 4 }, (_, i) => pageOptions.length - 5 + i).map((k, i) =>
                                    <li key={i} className={"paginate_button page-item " + (pageIndex === k ? "active " : "")}>
                                        <button onClick={() => gotoPage(k)} className="page-link">{k + 1}</button>
                                    </li>
                                )
                            }
                        </>
                    }

                    {/* last page */}
                    <li className={"paginate_button page-item " + (pageIndex === (pageCount - 1) ? "active " : "")}>
                        <button onClick={() => gotoPage(pageCount - 1)} className="page-link">{pageCount}</button>
                    </li>
                </>
            )
        } else {
            return [...pageOptions].map((_, i) => {
                return <li key={i} className={"paginate_button page-item " + (pageIndex === i ? "active " : "")}>
                    <button onClick={() => { gotoPage(i) }} className="page-link">{i + 1}</button>
                </li>
            });
        }
    }

    // Render the UI for your table
    return (
        <div className="dataTables_wrapper dt-bootstrap4">
            <div className="row">
                <div className="col-sm-12 col-md-6">
                    {
                        enablePagination ? <div className="dataTables_length" id="timeLogsTable_length">
                            <label>
                                Show <select
                                    className="custom-select custom-select-sm form-control form-control-sm"
                                    value={pageSize} onChange={e => {
                                        setPageSize(Number(e.target.value))
                                    }}
                                >
                                    {[10, 25, 50, 100].map((pageSize, i) => <option key={i} value={pageSize}>{pageSize}</option>)}
                                </select> entries
                        </label>
                        </div> : null
                    }
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
                            {tbodyRows.length > 0 ? tbodyRows.map(
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
                            ) :
                                <tr className="odd">
                                    <td colSpan={columns.length} className="dataTables_empty" valign="top">{text.empty || "No matching records found"}</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12 col-md-5">
                    <div className="dataTables_info" role="status" aria-live="polite">
                        <span>Showing {(enablePagination ? pageIndex * pageSize : 0) + (rows.length !== 0 ? 1 : 0)} to {enablePagination ? ((pageIndex + 1) * pageSize > rows.length ? rows.length : (pageIndex + 1) * pageSize) : rows.length} of {rows.length} entries</span>
                        {enableSearch && state.globalFilter ? <span> (filtered from {data.length} total entries)</span> : null}
                    </div>
                </div>
                <div className="col-sm-12 col-md-7">
                    {
                        enablePagination ? <div className="dataTables_paginate paging_simple_numbers">
                            <ul className="pagination">
                                <li className={"paginate_button page-item previous " + (canPreviousPage ? "" : "disabled ")}>
                                    <button className="page-link" onClick={() => previousPage()}>Previous</button>
                                </li>
                                {renderPaginationPages()}
                                <li className={"paginate_button page-item next " + (canNextPage ? "" : "disabled ")}>
                                    <button onClick={() => nextPage()} className="page-link">Next</button>
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