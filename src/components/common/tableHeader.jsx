import React, { Component } from "react";
import _ from "lodash";

// column: Array
// columnSorting: Object
// onSort: Function

class TableHeader extends Component {
  raiseSorting = (path) => {
    const columnSorting = { ...this.props.columnSorting };
    if (columnSorting.path === path) {
      columnSorting.order = columnSorting.order === "asc" ? "desc" : "asc";
    } else {
      columnSorting.path = path;
      columnSorting.order = "asc";
    }
    this.props.onSort(columnSorting);
  };

  renderSortIcon = (column) => {
    const { columnSorting } = this.props;

    if (column.path !== columnSorting.path) return null;
    if (columnSorting.order === "asc") return <i className="fa fa-sort-asc" />;
    return <i className="fa fa-sort-desc" />;
  };

  render() {
    const { column } = this.props;
    return (
      <thead>
        <tr>
          {column.map((column) => (
            <th
              style={{ cursor: "pointer" }}
              key={column.path || column.key}
              onClick={() => this.raiseSorting(column.path)}
            >
              {column.label}
              {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
