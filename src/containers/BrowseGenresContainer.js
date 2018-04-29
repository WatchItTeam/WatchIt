import React, { Component } from "react";
import BrowseGenrePage from "../components/BrowseGenrePage";
import { getGenres } from "../api/APIUtils";

class BrowseGenresContainer extends Component {
  static getDerivedStateFromProps(props) {
    return { genreId: props.match.params.id };
  }

  state = { genres: [], genreId: 0 }

  componentDidMount() {
    getGenres()
      .then(genres => this.setState({ genres }));
  }

  render() {
    return (
      <BrowseGenrePage genres={this.state.genres} genreId={this.state.genreId} />
    );
  }
}

export default BrowseGenresContainer;
