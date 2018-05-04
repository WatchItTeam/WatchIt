import React, { Component } from "react";
import PropTypes from "prop-types";
import BrowsePage from "../components/BrowsePage";
import { getShowsFromType, getGenreShows, getShowGenres } from "../api/APIUtils";

class BrowseTvContainer extends Component {
  state = { movies: [], genreTitle: "", genres: [], isLoading: false, error: false, currentPage: 1, totalPages: 1 };

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
    this.setState({ movies: [], genreTitle: "", isLoading: true, currentPage: 1 });

    if (filter === "top_rated") {
      getShowsFromType("top_rated")
        .then(movies => this.setState({ movies: movies.results,
          totalPages: movies.total_pages,
          isLoading: false }))
        .catch(() => {
          this.setState({ error: true });
        });
    } else if (filter === "airing_today") {
      getShowsFromType("airing_today")
        .then(movies => this.setState({ movies: movies.results,
          totalPages: movies.total_pages,
          isLoading: false }))
        .catch(() => {
          this.setState({ error: true });
        });
    } else if (filter === "popular") {
      getShowsFromType("popular")
        .then(movies => this.setState({ movies: movies.results,
          totalPages: movies.total_pages,
          isLoading: false }))
        .catch(() => {
          this.setState({ error: true });
        });
    } else if (filter === "genre") {
      if (id) {
        this.setGenreTitle(id);
        getGenreShows(id)
          .then(movies => this.setState({ movies: movies.results,
            totalPages: movies.total_pages,
            isLoading: false }))
          .catch(() => {
            this.setState({ error: true });
          });
      } else {
        this.setState({ isLoading: false });
      }
    }
  }

  loadMoreAndAppend = async () => {
    const { filter, id } = this.props.match.params;
    try {
      let resp;
      if (filter !== "genre") {
        resp = await getShowsFromType(filter, this.state.currentPage + 1);
      } else {
        resp = await getGenreShows(id, this.state.currentPage + 1);
      }
      /* The following piece of code removes duplicate movies as the api sometimes returns
       movies that already was fetched before. */
      const index = this.state.movies.concat(resp.results);
      const resArr = [];
      index.forEach((item) => {
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
      this.setState({ error });
    }
  }

  render() {
    const tabLinks = {
      Popular: "/shows/popular",
      Top: "/shows/top_rated",
      Airing: "/shows/airing_today",
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
        currentPage={this.state.currentPage}
        totalPages={this.state.totalPages}
        loadMoreFunc={this.loadMoreAndAppend}
      />
    );
  }
}

BrowseTvContainer.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default BrowseTvContainer;
