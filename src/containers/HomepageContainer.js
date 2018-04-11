import React, { Component } from "react";
import PropTypes from "prop-types";
import { getNowPlayingMovies, getNowAiringTVShows } from "../api/APIUtils";
import Homepage from "../components/Homepage";

class HomepageContainer extends Component {
  static propTypes = {
    movies: PropTypes.array.isRequired,
    series: PropTypes.array.isRequired,
    setNowPlayingMovies: PropTypes.func.isRequired,
    setNowAiringTVShows: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { movies: m, series: s } = this.props;
    if (m.length !== 0 && s.length !== 0) return;

    getNowPlayingMovies()
      .then((movies) => {
        this.props.setNowPlayingMovies(movies.splice(0, 18));
      }).catch(error => console.log(error)); // TODO: fix better error handling

    getNowAiringTVShows()
      .then((series) => {
        this.props.setNowAiringTVShows(series.splice(0, 18));
      }).catch(error => console.log(error)); // TODO: fix better error handling here too xD
  }

  render() {
    const { movies, series } = this.props;
    if (!movies || !series) return null;
    return (
      <Homepage movies={this.props.movies} series={this.props.series} />
    );
  }
}

export default HomepageContainer;
