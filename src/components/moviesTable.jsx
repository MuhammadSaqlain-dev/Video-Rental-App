import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";
import { Link } from "react-router-dom";
import auth from "./../services/authService";

class MoviesTable extends Component {
  column = [
    {
      label: "Title",
      path: "title",
      content: (movies) => (
        <Link to={`/movies/${movies._id}`}>{movies.title}</Link>
      ),
    },
    { label: "Genre", path: "genre.name" },
    { label: "Stock", path: "numberInStock" },
    { label: "Rate", path: "dailyRentalRate" },
    {
      key: "like",
      content: (movie) => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      ),
    },
  ];

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) {
      this.column.push(this.showDeleteBtn);
    }
  }

  showDeleteBtn = {
    key: "delete",
    content: (movie) => (
      <button
        onClick={() => this.props.onDelete(movie)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    ),
  };

  render() {
    const { movies, onSort, columnSorting } = this.props;

    return (
      <Table
        column={this.column}
        onSort={onSort}
        columnSorting={columnSorting}
        data={movies}
      />
    );
  }
}

export default MoviesTable;
