import React, { Component } from "react";
import PropTypes from "prop-types";
import BrowseGenrePage from "../components/BrowseGenrePage";

class BrowseGenresContainer extends Component {
  static getDerivedStateFromProps(props) {
    return { genreId: props.match.params.id };
  }

  state = { genreId: 0 }

  render() {
    return (
      <BrowseGenrePage
        genres={this.props.genres}
        genreId={this.state.genreId}
      />
    );
  }
}

BrowseGenresContainer.propTypes = {
  genres: PropTypes.array.isRequired,
};

export default BrowseGenresContainer;
