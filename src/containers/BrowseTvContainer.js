import React, { Component } from "react";
import PropTypes from "prop-types";
import BrowsePage from "../components/BrowsePage";
import { getShowsFromType, getGenreShows, getShowGenres, getShowsFromYear } from "../api/APIUtils";
import createDebouncedFunc from "../utils/createDebouncedFunc";

class BrowseTvContainer extends Component {
  state = {
    movies: [],
    genreTitle: "",
    genres: [],
    isLoading: false,
    error: false,
    searchWords: "",
  };

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

  searchHandler = (query) => {
    this.setSearchbarValue(query);
    this.search(query);
  }

  search = createDebouncedFunc((query) => {
    // don't need to search if the user just clears the search bar
    if (query === "") return;
    this.props.history.push(`/shows/year/${query}`);
  })

  setSearchbarValue = (searchWords) => {
    this.setState({ searchWords });
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
    this.setState({
      movies: [],
      genreTitle: "",
      isLoading: true,
      error: "",
    });

    if (filter === "top") {
      getShowsFromType("top_rated")
        .then(movies => this.setState({ movies, isLoading: false }))
        .catch(() => {
          this.setState({ error: "Oops! Could not fetch tv shows :(" });
        });
    } else if (filter === "airing") {
      getShowsFromType("airing_today")
        .then(movies => this.setState({ movies, isLoading: false }))
        .catch(() => {
          this.setState({ error: "Oops! Could not fetch tv shows :(" });
        });
    } else if (filter === "popular") {
      getShowsFromType("popular")
        .then(movies => this.setState({ movies, isLoading: false }))
        .catch(() => {
          this.setState({ error: "Oops! Could not fetch tv shows :(" });
        });
    } else if (filter === "genre") {
      if (id) {
        this.setGenreTitle(id);
        getGenreShows(id)
          .then(movies => this.setState({ movies, isLoading: false }))
          .catch(() => {
            this.setState({ error: "Oops! Could not fetch tv shows :(" });
          });
      } else {
        this.setState({ isLoading: false });
      }
    } else if (filter === "year") {
      if (id) {
        getShowsFromYear(id)
          .then((movies) => {
            if (movies.length === 0) this.setState({ error: "The database could not find any shows from that year" });
            this.setState({ movies, isLoading: false });
          })
          .catch(() => {
            this.setState({ error: "Oops! Could not fetch tv shows :(" });
          });
      } else {
        this.setState({ isLoading: false });
      }
    } else {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const tabLinks = {
      Popular: "/shows/popular",
      Top: "/shows/top",
      Airing: "/shows/airing",
      Genre: "/shows/genre",
      Year: "/shows/year",
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
        searchValue={this.state.searchWords}
        search={this.searchHandler}
        setSearchbarValue={this.setSearchbarValue}
      />
    );
  }
}

BrowseTvContainer.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default BrowseTvContainer;
