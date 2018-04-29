import React, { Component } from "react";
import BrowseMoviesPage from "../components/BrowseMoviesPage";
import { getMoviesFromType, getGenreMovies } from "../api/APIUtils";

class BrowseMoviesContainer extends Component {
  state = { movies: [] };

  componentDidMount() {
    this.getMoviesFromTab();
  }

  componentDidUpdate() {
    this.getMoviesFromTab();
  }

  getMoviesFromTab() {
    if (this.props.match.params.filter === "top") {
      getMoviesFromType("top_rated")
        .then(movies => this.setState({ movies }));
    } else if (this.props.match.params.filter === "upcoming") {
      getMoviesFromType("upcoming")
        .then(movies => this.setState({ movies }));
    } else if (this.props.match.params.filter === "popular") {
      getMoviesFromType("popular")
        .then(movies => this.setState({ movies }));
    } else if (this.props.match.params.filter === "genre") {
      if (this.props.match.params.id !== undefined) {
        getGenreMovies(this.props.match.params.id)
          .then(movies => this.setState({ movies }));
      }
    }
  }

  render() {
    const tabLinks = {
      Top: "/movies/top",
      Upcoming: "/movies/upcoming",
      Popular: "/movies/popular",
      Genre: "/movies/genre",
    };
    return (
      <BrowseMoviesPage
        {...this.props}
        movies={this.state.movies}
        tabLinks={tabLinks}
      />
    );
  }
}

export default BrowseMoviesContainer;
