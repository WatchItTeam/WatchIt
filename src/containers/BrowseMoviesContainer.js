import React, { Component } from "react";
import PropTypes from "prop-types";
import BrowsePage from "../components/BrowsePage";
import { getMoviesFromType, getGenreMovies, getMovieGenres } from "../api/APIUtils";

class BrowseMoviesContainer extends Component {
  state = { movies: [], genreTitle: "", genres: [], isLoading: false, error: false };

  componentDidMount() {
    getMovieGenres()
      .then((genres) => {
        this.setState({ genres });
        this.getMoviesFromTab();
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.getMoviesFromTab();
    }
  }

  setGenreTitle(id) {
    this.state.genres.forEach((genre) => {
      if (genre.id.toString() === id) {
        this.setState({ genreTitle: `(${genre.name})` });
      }
    });
  }

  getMoviesFromTab() {
    const { filter, id } = this.props.match.params;
    this.setState({ movies: [], genreTitle: "", isLoading: true });

    if (filter === "top") {
      getMoviesFromType("top_rated")
        .then(movies => this.setState({ movies, isLoading: false }))
        .catch(() => {
          this.setState({ error: true });
        });
    } else if (filter === "upcoming") {
      getMoviesFromType("upcoming")
        .then(movies => this.setState({ movies, isLoading: false }))
        .catch(() => {
          this.setState({ error: true });
        });
    } else if (filter === "popular") {
      getMoviesFromType("popular")
        .then(movies => this.setState({ movies, isLoading: false }))
        .catch(() => {
          this.setState({ error: true });
        });
    } else if (filter === "genre") {
      if (id) {
        this.setGenreTitle(id);
        getGenreMovies(id)
          .then(movies => this.setState({ movies, isLoading: false }))
          .catch(() => {
            this.setState({ error: true });
          });
      } else {
        this.setState({ isLoading: false });
      }
    }
  }

  render() {
    const tabLinks = {
      Popular: "/movies/popular",
      Top: "/movies/top",
      Upcoming: "/movies/upcoming",
      Genre: "/movies/genre",
    };
    return (
      <BrowsePage
        {...this.props}
        genres={this.state.genres}
        movies={this.state.movies}
        tabLinks={tabLinks}
        genreTitle={this.state.genreTitle}
        isLoading={this.state.isLoading}
        error={this.state.error}
        type="movies"
      />
    );
  }
}

BrowseMoviesContainer.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default BrowseMoviesContainer;
