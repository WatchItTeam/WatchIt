import React, { Component } from "react";
import PropTypes from "prop-types";
import { getNowPlayingMovies, getNowAiringTVShows } from "../api/APIUtils";
import Homepage from "../components/Homepage";
import ErrorMessage from "../components/ErrorMessage";

class HomepageContainer extends Component {
  static propTypes = {
    movies: PropTypes.array.isRequired,
    series: PropTypes.array.isRequired,
    setNowPlayingMovies: PropTypes.func.isRequired,
    setNowAiringTVShows: PropTypes.func.isRequired,
  }

  state = {
    error: false,
  }

  componentDidMount() {
    const { movies: m, series: s } = this.props;
    if (m.length !== 0 && s.length !== 0) return;

    getNowPlayingMovies()
      .then((movies) => {
        if (!movies) return;
        this.props.setNowPlayingMovies(movies.splice(0, 18));
      }).catch(() => {
        this.setState({ error: true });
      });

    getNowAiringTVShows()
      .then((series) => {
        if (!series) return;
        this.props.setNowAiringTVShows(series.splice(0, 18));
      }).catch(() => {
        this.setState({ error: true });
      });
  }

  render() {
    const { movies, series } = this.props;

    if (this.state.error) {
      return (
        <ErrorMessage>Oops! Could not load homepage :(</ErrorMessage>
      );
    }

    if (movies.length === 0 || series.length === 0) {
      return (
        <div>
          loading...
        </div>
      );
    }

    return (
      <Homepage movies={this.props.movies} series={this.props.series} />
    );
  }
}

export default HomepageContainer;
