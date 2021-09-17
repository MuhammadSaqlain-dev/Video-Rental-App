import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/genreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./common/search";
import { toast } from "react-toastify";

class Movies extends Component {
  state = {
    movies: [],
    genre: [],
    pageSize: 4,
    currentPage: 1,
    columnSorting: { path: "title", order: "asc" },
    searchQuery: "",
  };

  getPagedData = () => {
    const {
      movies: allMovies,
      pageSize,
      selectedGenre,
      currentPage,
      columnSorting,
      searchQuery,
    } = this.state;
    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

    const sorting = _.orderBy(
      filtered,
      [columnSorting.path],
      [columnSorting.order]
    );

    const movies = paginate(sorting, currentPage, pageSize);

    return { movies, totalCount: filtered.length };
  };

  async componentDidMount() {
    const { data: genreData } = await getGenres();

    const genre = [{ name: "All Genres", _id: "" }, ...genreData];

    const { data: movieData } = await getMovies();

    this.setState({ movies: movieData, genre });
  }

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;

    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id); // Optimistic Updates
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast("This movie has already been deleted!");
      }
      this.setState({ movies: originalMovies });
    }
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (paged) => {
    this.setState({ currentPage: paged });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSearch = (searchQuery) => {
    this.setState({ searchQuery, selectedGenre: null, currentPage: 1 });
  };

  handleSorting = (columnSorting) => {
    this.setState({ columnSorting });
  };

  render() {
    const { length: count } = this.state.movies;
    const { user } = this.props;

    const { movies, totalCount } = this.getPagedData();

    return (
      <div className="container">
        <div className="row">
          <div className="col-3">
            <ListGroup
              totalGenres={this.state.genre}
              selectedGenre={this.state.selectedGenre}
              onGenreSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col-9">
            {user && (
              <Link to="/movies/new" className="btn btn-primary mb-4">
                New Movie
              </Link>
            )}
            <p>Showing {totalCount} movies in the database.</p>

            <SearchBox
              value={this.state.searchQuery}
              onChange={this.handleSearch}
            />

            <MoviesTable
              onSort={this.handleSorting}
              movies={movies}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              columnSorting={this.state.columnSorting}
            />

            <Pagination
              totalItems={totalCount}
              pageSize={this.state.pageSize}
              currentPage={this.state.currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
