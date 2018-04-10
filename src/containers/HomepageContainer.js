import React, { Component } from "react";
import { getNowPlayingMovies, getNowAiringTVShows } from "../api/APIUtils";
import Homepage from "../components/Homepage";

class HomepageContainer extends Component {
  state = {
    movies: [],
    series: [],
  }

  componentDidMount() {
    getNowPlayingMovies()
      .then((movies) => {
        this.setState({ movies: movies.splice(0, 18) });
      }).catch(error => console.log(error)); // TODO: fix better error handling

    getNowAiringTVShows()
      .then((series) => {
        this.setState({ series: series.splice(0, 18) });
      }).catch(error => console.log(error)); // TODO: fix better error handling here too xD
  }

  render() {
    return (
      <Homepage movies={this.state.movies} series={this.state.series} />
    );
  }
}

export default HomepageContainer;
