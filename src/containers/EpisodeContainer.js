import React, { Component } from "react";
import EpisodePage from "../components/EpisodePage";
import { getSeasonFromId, getTVInfo } from "../api/APIUtils";

class EpisodeContainer extends Component {
  state = {
    episodes: [],
    title: "",
    isLoading: true,
    shows: {},
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

  addEpisode = (show) => {
    if (!(this.state.shows[show.id] === null)) {
      this.setState({ shows: {
        ...this.state.shows,
        [show.id]: "apa",
      },
      });
    }
    console.log(this.state.shows);
  }

  render() {
    return (
      <EpisodePage
        title={this.state.title}
        episodes={this.state.episodes}
        seasonNumber={1}
        isLoading={this.state.isLoading}
        addEpisode={this.addEpisode}
      />
    );
  }
}

export default EpisodeContainer;
