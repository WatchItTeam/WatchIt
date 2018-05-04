import React, { Component } from "react";
import PropTypes from "prop-types";
import BrowsePage from "../components/BrowsePage";
import { getMoviesFromType, getGenreMovies, getMovieGenres } from "../api/APIUtils";

class BrowseMoviesContainer extends Component {
  state = { movies: [], genreTitle: "", genres: [], isLoading: false, error: false, currentPage: 1, totalPages: 1 };
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
    console.log(id);
    console.log(filter);
    console.log(this.state.genres);
    this.setState({ movies: [], genreTitle: "", isLoading: true, currentPage: 1 });
    if (filter === "top_rated") {
      getMoviesFromType("top_rated")
        .then(movies => this.setState({ movies: movies.results,
          totalPages: movies.total_pages,
          isLoading: false }))
        .catch(() => {
          this.setState({ error: true });
        });
    } else if (filter === "upcoming") {
      getMoviesFromType("upcoming")
        .then(movies => this.setState({ movies: movies.results,
          totalPages: movies.total_pages,
          isLoading: false }))
        .catch(() => {
          this.setState({ error: true });
        });
    } else if (filter === "popular") {
      getMoviesFromType("popular")
        .then(movies => this.setState({ movies: movies.results,
          totalPages: movies.total_pages,
          isLoading: false }))
        .catch(() => {
          this.setState({ error: true });
        });
    } else if (filter === "genre") {
      console.log(filter);
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

  loadMoreAndAppend = async () => {
    const { filter } = this.props.match.params;
    try {
      const resp = await getMoviesFromType(filter, this.state.currentPage + 1);
      const index = this.state.movies.concat(resp.results);
      const resArr = [];
      index.filter((item) => {
        const i = resArr.findIndex(x => x.id === item.id);
        if (i <= -1) {
          resArr.push(item);
        }
        return null;
      });
      this.setState({
        movies: resArr,
        currentPage: resp.page,
        totalPages: resp.total_pages });
    } catch (error) {
      console.error(error);
      this.setState({ error });
    }
  }

  render() {
    const tabLinks = {
      Popular: "/movies/popular",
      Top: "/movies/top_rated",
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
        currentPage={this.state.currentPage}
        totalPages={this.state.totalPages}
        loadMoreFunc={this.loadMoreAndAppend}
      />
    );
  }
}

BrowseMoviesContainer.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default BrowseMoviesContainer;
