import React from 'react';

import {
  useReactTable,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';

import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpAZ, faArrowDownZA } from '@fortawesome/free-solid-svg-icons';
import { selectPublications } from '../store/slice/appState';
import { Publication } from '../../types';

export function PubsTable() {
  const publications = useSelector(selectPublications);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const columnHelper = createColumnHelper<Publication>();

  const columns = [
    columnHelper.accessor('title', {
      header: 'Title',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('author', {
      header: 'Author(s)',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('year', {
      header: 'Year',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('url', {
      header: 'URL',
      cell: (info) => info.getValue(),
      enableColumnFilter: false,
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

  React.useEffect(
    () => {
      if (table.getState().columnFilters[0]?.id === 'fullName') {
        if (table.getState().sorting[0]?.id !== 'fullName') {
          table.setSorting([{ id: 'fullName', desc: false }]);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [table.getState().columnFilters[0]?.id]
  );

  return (
    <Container fluid>
      <Row>
        <Table
          className="text-center"
          bordered
          {...{
            style: {
              width: table.getTotalSize(),
              // tableLayout: 'fixed'
            },
          }}
        >
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      {...{
                        key: header.id,
                        colSpan: header.colSpan,
                        className: 'h3 bg-secondary',
                        style: {
                          width: header.getSize(),
                        },
                      }}
                    >
                      {header.isPlaceholder ? null : (
                        <div className="d-flex">
                          <div className="flex-grow-1">
                            <div
                              {...{
                                className: header.column.getCanSort()
                                  ? 'cursor-pointer select-none'
                                  : '',
                                onClick: header.column.getToggleSortingHandler(),
                              }}
                            >
                              {flexRender(header.column.columnDef.header, header.getContext())}
                              {{
                                asc: <FontAwesomeIcon icon={faArrowUpAZ} />,
                                desc: <FontAwesomeIcon icon={faArrowDownZA} />,
                              }[header.column.getIsSorted() as string] ?? null}
                            </div>
                            {header.column.getCanFilter() ? (
                              <div>
                                <Filter column={header.column} table={table} />
                              </div>
                            ) : null}
                          </div>
                          <div
                            {...{
                              onDoubleClick: () => header.column.resetSize(),
                              onMouseDown: header.getResizeHandler(),
                              onTouchStart: header.getResizeHandler(),
                              className: `resizer ${
                                header.column.getIsResizing() ? 'is-resizing' : ''
                              }`,
                            }}
                          >
                            {header.getSize()} {table.getTotalSize()}
                          </div>
                        </div>
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
                      <td key={cell.id} className="text-break">
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
              defaultValue={table.getState().pagination.pageIndex + 1}
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

function Filter({ column, table }) {
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = React.useMemo(
    () =>
      typeof firstValue === 'number'
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [column.getFacetedUniqueValues()]
  );

  return typeof firstValue === 'number' ? (
    <div className="d-flex">
      <DebouncedInput
        type="number"
        min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
        max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
        value={(columnFilterValue as [number, number])?.[0] ?? ''}
        onChange={(value) => column.setFilterValue((old: [number, number]) => [value, old?.[1]])}
        placeholder={`Min ${
          column.getFacetedMinMaxValues()?.[0] ? `(${column.getFacetedMinMaxValues()?.[0]})` : ''
        }`}
      />
      <DebouncedInput
        type="number"
        min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
        max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
        value={(columnFilterValue as [number, number])?.[1] ?? ''}
        onChange={(value) => column.setFilterValue((old: [number, number]) => [old?.[0], value])}
        placeholder={`Max ${
          column.getFacetedMinMaxValues()?.[1] ? `(${column.getFacetedMinMaxValues()?.[1]})` : ''
        }`}
      />
    </div>
  ) : (
    <>
      <datalist id={column.id + 'list'}>
        {sortedUniqueValues.slice(0, 5000).map((value) => (
          <option value={value} key={value} />
        ))}
      </datalist>
      <DebouncedInput
        type="text"
        value={(columnFilterValue ?? '') as string}
        onChange={(value) => column.setFilterValue(value)}
        list={column.id + 'list'}
      />
      <div className="h-1" />
    </>
  );
}

// A debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(
    () => {
      const timeout = setTimeout(() => {
        onChange(value);
      }, debounce);

      return () => clearTimeout(timeout);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value]
  );

  return <Form.Control {...props} value={value} onChange={(e) => setValue(e.target.value)} />;
}
