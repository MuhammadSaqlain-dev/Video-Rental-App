import React, { Component } from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

// column: object
// onSort: Function
// columnSorting: Array
// data: Array

const Table = ({ column, onSort, columnSorting, data }) => {
  return (
    <table className="table">
      <TableHeader
        className="table"
        column={column}
        onSort={onSort}
        columnSorting={columnSorting}
      />
      <TableBody data={data} columns={column} />
    </table>
  );
};

export default Table;
