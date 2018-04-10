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
        this.setState({ movies });
        this.limitMovies(18);
      }).catch(error => console.log(error)); // TODO: fix better error handling

    getNowAiringTVShows()
      .then((series) => {
        this.setState({ series });
        this.limitSeries(18);
      }).catch(error => console.log(error)); // TODO: fix better error handling here too xD
  }

  limitMovies(amount) {
    this.setState({
      movies: this.state.movies.splice(0, amount),
    });
  }

  limitSeries(amount) {
    this.setState({
      series: this.state.series.splice(0, amount),
    });
  }

  render() {
    return (
      <Homepage movies={this.state.movies} series={this.state.series} />
    );
  }
}

export default HomepageContainer;
