import React, { Component } from "react";
import PropTypes from "prop-types";
import EpisodePage from "../components/Episodes/EpisodePage";
import { getSeasonFromId, getTVInfo } from "../api/APIUtils";
import { setEpisodeStatus } from "../Firebase/lists";

class EpisodeContainer extends Component {
  state = {
    episodes: [],
    title: "",
    isLoading: true,
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    const season = getSeasonFromId(id, 1);

    const { currentMovie } = this.props;
    let tvInfo;
    if (!currentMovie || currentMovie.id !== id) {
      tvInfo = getTVInfo(this.props.match.params.id);
    } else {
      tvInfo = Promise.resolve(currentMovie);
    }

    Promise.all([season, tvInfo]).then(([episodes, movie]) => {
      this.setState({
        title: movie.name,
        episodes,
        isLoading: false,
      });
    });
  }

  addEpisode = ({ id, episodeNumber }) => {
    setEpisodeStatus(id, episodeNumber, true);
  }

  removeEpisode = ({ id, episodeNumber }) => {
    setEpisodeStatus(id, episodeNumber, false);
  }

  render() {
    return (
      <EpisodePage
        title={this.state.title}
        episodes={this.state.episodes}
        showId={this.props.match.params.id}
        seasonNumber={1}
        isLoading={this.state.isLoading}
        addEpisode={this.addEpisode}
        removeEpisode={this.removeEpisode}
      />
    );
  }
}

EpisodeContainer.propTypes = {
  match: PropTypes.object.isRequired,
  currentMovie: PropTypes.object.isRequired,
};

export default EpisodeContainer;
