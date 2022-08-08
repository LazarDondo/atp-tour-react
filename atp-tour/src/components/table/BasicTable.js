import { useState } from "react";
import { useTable } from "react-table";
import './BasicTable.css';
import PaginationFooter from "./PaginationFooter";

export const BasicTable = ({ id, columns, data, hiddenColumns, action, rowClickAction }) => {
    const initialState = { hiddenColumns };
    const [sortColumn, setSortColumn] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');
    const { number, size } = data;

    const sortTable = (column) => {
        console.log(column);
        var sortDir;
        if (sortColumn !== column) {
            sortDir = 'asc';
        }
        else {
            sortDir = sortDirection === 'asc' ? 'desc' : 'asc';
        }
        const pagingValues = { page: number, size, sort: column + ',' + sortDir };
        action(pagingValues);
        setSortColumn(column);
        setSortDirection(sortDir);
    }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data: data.content, initialState });

    const onRowClick = (data) => {
        if (rowClickAction) {
            rowClickAction(data);
        }
    }

    const renderTable = () => {
        if (data.content.length > 0) {
            return (
                <>
                    <table {...getTableProps()} id={id} className="table table-bordered basic-table">
                        <thead>
                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <th onClick={() => column.sortValue ? sortTable(column.sortValue) : undefined} {...column.getHeaderProps({ style: { width: column.width } })}>{column.render("Header")} {column.sortValue ? <i className="fa fa-sort"></i> : undefined}</th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {rows.map(row => {
                                prepareRow(row)
                                return (
                                    <tr {...row.getRowProps({ style: { height: '30px' }, onClick: () => { onRowClick(row.original) } })}>
                                        {row.cells.map(cell => {
                                            return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <PaginationFooter data={{ number: data.number, totalPages: data.totalPages, size: data.size, sort: sortColumn + ',' + sortDirection }} action={action} />
                </>
            )
        }
        else {
            return (
                <div id="emptyTable">
                    No data to display!
                </div>
            )
        }
    }

    return (
        renderTable()
    );
};