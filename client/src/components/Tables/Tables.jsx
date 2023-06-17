import React, { useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const Tables = (props) => {
  const rowData = props.rowData;
  const columnDefs = props.columnDefs;
  const defaultColDef = {
    // sortable: true,
    // filter: true,
    // floatingFilter: true,
    // filterParams: {
    //   filterOptions: ["contains", "notContains"],
    //   defaultOption: "contains",
    //   caseSensitive: true,
    //   textCustomComparator: (filter, value, filterText) => {
    //     console.log(filter, value, filterText);
    //   },
    // },
  };

  return (
    <div className="ag-theme-alpine" style={{ height: '335px', width: '100%' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
      />
    </div>
  );
};

export default Tables;
