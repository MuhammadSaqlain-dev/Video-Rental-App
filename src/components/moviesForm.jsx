import React from "react";
import Form from "./common/form";
import joi from "joi-browser";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";

//  ID# {match.params.id}

class MoviesForm extends Form {
  state = {
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    genre: [],
    errors: {},
  };

  async populateGenres() {
    const { data: genre } = await getGenres();
    this.setState({ genre });
  }

  async populateMovies() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;

      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovies();
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  schema = {
    _id: joi.string(),
    title: joi.string().required().label("Title"),
    genreId: joi.string().required().label("Genre"),
    numberInStock: joi
      .number()
      .integer()
      .min(1)
      .max(100)
      .required()
      .label("Number In Stock"),
    dailyRentalRate: joi.number().min(0).max(10).required().label("Rate"),
  };

  doSubmit = async () => {
    await saveMovie(this.state.data);

    this.props.history.push("/movies");
    // CALL THE SERVER
    console.log("Submitted");
  };

  render() {
    // const { match, history } = this.props;

    return (
      <div className="container">
        <h3>Movie Form</h3>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("Title", "title")}
          {this.renderSelect("Genre", "genreId", this.state.genre)}
          {this.renderInput("Number In Stock", "numberInStock", "number")}
          {this.renderInput("Rate", "dailyRentalRate")}
          {this.renderButton("Save Movie")}
        </form>
      </div>
    );
  }
}

export default MoviesForm;

// import React from "react";
// import Joi from "joi-browser";
// import Form from "./common/form";
// import { getMovie, saveMovie } from "../services/movieService";
// import { getGenres } from "../services/genreService";

// class MoviesForm extends Form {
//   state = {
//     data: {
//       title: "",
//       genreId: "",
//       numberInStock: "",
//       dailyRentalRate: "",
//     },
//     genres: [],
//     errors: {},
//   };

//   schema = {
//     _id: Joi.string(),
//     title: Joi.string().required().label("Title"),
//     genreId: Joi.string().required().label("Genre"),
//     numberInStock: Joi.number()
//       .required()
//       .min(0)
//       .max(100)
//       .label("Number in Stock"),
//     dailyRentalRate: Joi.number()
//       .required()
//       .min(0)
//       .max(10)
//       .label("Daily Rental Rate"),
//   };

//   async populateGenres() {
//     const { data: genres } = await getGenres();
//     this.setState({ genres });
//   }

//   async populateMovie() {
//     try {
//       const movieId = this.props.match.params.id;
//       if (movieId === "new") return;

//       const { data: movie } = await getMovie(movieId);
//       this.setState({ data: this.mapToViewModel(movie) });
//     } catch (ex) {
//       if (ex.response && ex.response.status === 404)
//         this.props.history.replace("/not-found");
//     }
//   }

//   async componentDidMount() {
//     await this.populateGenres();
//     await this.populateMovie();
//   }

//   mapToViewModel(movie) {
//     return {
//       _id: movie._id,
//       title: movie.title,
//       genreId: movie.genre._id,
//       numberInStock: movie.numberInStock,
//       dailyRentalRate: movie.dailyRentalRate,
//     };
//   }

//   doSubmit = async () => {
//     await saveMovie(this.state.data);

//     this.props.history.push("/movies");
//   };

//   render() {
//     return (
//       <div>
//         <h1>Movie Form</h1>
//         <form onSubmit={this.handleSubmit}>
//           {this.renderInput("title", "Title")}
//           {this.renderSelect("genreId", "Genre", this.state.genres)}
//           {this.renderInput("numberInStock", "Number in Stock", "number")}
//           {this.renderInput("dailyRentalRate", "Rate")}
//           {this.renderButton("Save")}
//         </form>
//       </div>
//     );
//   }
// }

// export default MoviesForm;
