import React from 'react';
import { useSelector } from 'react-redux';

import {
  ColumnFiltersState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownZA, faArrowUpAZ } from '@fortawesome/free-solid-svg-icons';

import { selectPublications } from '../store/slice/appState';
import { Publication } from '../../types';
import { ColumnFilter } from './ColumnFilter.tsx';

export function PublicationsTable() {
  const publications = useSelector(selectPublications);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const columnHelper = createColumnHelper<Publication>();

  const columns = [
    columnHelper.accessor('title', {
      header: 'Title',
      cell: (info) => (
        <a href={info.row.original.url} target="_blank" rel="noopener noreferrer">
          {info.getValue()}
        </a>
      ),
    }),
    columnHelper.accessor('author', {
      header: 'Author(s)',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('year', {
      header: 'Year',
      cell: (info) => info.getValue(),
      size: 100,
    }),
  ];

  const table = useReactTable({
    data: publications,
    columns,
    state: {
      columnFilters,
    },
    defaultColumn: {
      size: 200,
      minSize: 50,
      maxSize: 500,
    },
    columnResizeMode: 'onChange',
    columnResizeDirection: 'ltr',
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
  });

  return (
    <Container fluid>
      <Row>
        <Table className="align-middle text-break text-center" bordered>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className={`h3 bg-secondary ${
                        header.column.getCanSort() ? 'cursor-pointer select-none' : ''
                      }`}
                      style={{
                        position: 'relative',
                        width: header.getSize(),
                      }}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {header.isPlaceholder ? null : (
                        <>
                          <div>
                            {/* Header */}
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {/* Sorting Icons */}
                            {{
                              asc: <FontAwesomeIcon icon={faArrowUpAZ} />,
                              desc: <FontAwesomeIcon icon={faArrowDownZA} />,
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                          {/* Column Filter */}
                          {header.column.getCanFilter() ? (
                            <ColumnFilter column={header.column} table={table} />
                          ) : null}
                          <div
                            onDoubleClick={() => header.column.resetSize()}
                            onMouseDown={header.getResizeHandler()}
                            onTouchStart={header.getResizeHandler()}
                            className={`resizer ${header.column.getIsResizing() ? 'is-resizing' : ''}`}
                          />
                        </>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Row>
      <Row>
        <Col sm={12} md={4} lg={4} className="d-grid">
          <Button
            variant="warning"
            size="lg"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
        </Col>
        <Col sm={12} md={4} lg={4} className="d-flex justify-content-around">
          <div className="d-flex align-items-center">
            <span className="mx-2">Page</span>
            <Form.Control
              type="number"
              value={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              min={1}
              max={table.getPageCount()}
            />
            <span className="mx-2 text-nowrap">of {table.getPageCount()}</span>
          </div>
          <div className="d-flex align-items-center">
            <Form.Select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[5, 10, 20, 25, 50, 100].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize} rows
                </option>
              ))}
            </Form.Select>
          </div>
        </Col>
        <Col sm={12} md={4} lg={4} className="d-grid">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
