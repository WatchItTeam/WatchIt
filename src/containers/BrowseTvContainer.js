import React, { Component } from "react";
import PropTypes from "prop-types";
import BrowsePage from "../components/BrowsePage";
import { getShowsFromType, getGenreShows, getShowGenres } from "../api/APIUtils";

class BrowseTvContainer extends Component {
  state = { movies: [], genreTitle: "", genres: [], isLoading: false, error: false };

  componentDidMount() {
    getShowGenres()
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
      getShowsFromType("top_rated")
        .then(movies => this.setState({ movies, isLoading: false }))
        .catch(() => {
          this.setState({ error: true });
        });
    } else if (filter === "airing") {
      getShowsFromType("airing_today")
        .then(movies => this.setState({ movies, isLoading: false }))
        .catch(() => {
          this.setState({ error: true });
        });
    } else if (filter === "popular") {
      getShowsFromType("popular")
        .then(movies => this.setState({ movies, isLoading: false }))
        .catch(() => {
          this.setState({ error: true });
        });
    } else if (filter === "genre") {
      if (id) {
        this.setGenreTitle(id);
        getGenreShows(id)
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
      Popular: "/shows/popular",
      Top: "/shows/top",
      Airing: "/shows/airing",
      Genre: "/shows/genre",
    };
    return (
      <BrowsePage
        genres={this.state.genres}
        movies={this.state.movies}
        tabLinks={tabLinks}
        genreTitle={this.state.genreTitle}
        isLoading={this.state.isLoading}
        error={this.state.error}
        type="shows"
      />
    );
  }
}

BrowseTvContainer.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default BrowseTvContainer;
