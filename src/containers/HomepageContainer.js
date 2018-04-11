import React, { Component } from "react";
import { getNowPlayingMovies, getNowAiringTVShows } from "../api/APIUtils";
import Homepage from "../components/Homepage";
import ErrorMessage from "../components/ErrorMessage";

class HomepageContainer extends Component {
  state = {
    movies: [],
    series: [],
    error: false,
  }

  componentDidMount() {
    getNowPlayingMovies()
      .then((movies) => {
        if (!movies) return;
        this.setState({ movies: movies.splice(0, 18) });
      }).catch(() => {
        this.setState({ error: true });
      });

    getNowAiringTVShows()
      .then((series) => {
        if (!series) return;
        this.setState({ series: series.splice(0, 18) });
      }).catch(() => {
        this.setState({ error: true });
      });
  }

  render() {
    if (this.state.error) {
      return (
        <ErrorMessage>Oops! Could not load homepage :(</ErrorMessage>
      );
    }

    if (this.state.movies.length === 0) {
      return (
        <div>
          loading...
        </div>
      );
    }
    return (
      <Homepage movies={this.state.movies} series={this.state.series} />
    );
  }
}

export default HomepageContainer;
