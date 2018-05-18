import React, { Component } from "react";
import PropTypes from "prop-types";
import EpisodePage from "../components/Episodes/EpisodePage";
import { getSeasonFromId, getTVInfo, normalizeMovie } from "../api/APIUtils";
import { successToast, errorToast } from "../utils/toast";
import firebase from "../Firebase/firebase";
import parseName from "../utils/parseName";
import {
  setEpisodeStatus, onShowSnapshot, addToList, watchStates, setSeasonStatus,
} from "../Firebase/lists";

class EpisodeContainer extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    currentMovie: PropTypes.object.isRequired,
  }

  state = {
    episodes: [],
    title: "",
    currentShow: {},
    isLoading: true,
    watchedEpisodes: {},
    /* the watch status/list the current show is in, if the user has already added it */
    statusOfCurrentMovie: null,
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

    Promise.all([season, tvInfo]).then(([episodes, show]) => {
      this.setState({
        title: show.name,
        currentShow: normalizeMovie(show),
        episodes,
        isLoading: false,
      });
    });

    // wait until the user has signed in to check their watch status
    // of the current movie
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.checkCurrentShow(user);
      }
    });
  }

  checkCurrentShow(user) {
    const { id } = this.props.match.params;
    this.unsubscribe = onShowSnapshot(user.uid, id, (doc) => {
      const data = doc.data();
      if (!data) return;

      this.setState({
        watchedEpisodes: data.episodes_watched || {},
        statusOfCurrentMovie: data.watch_status,
      });
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }

  // passed down to EpisodePage -> Season -> EpisodeItem / EpisodeMobileItem
  addEpisode = async ({ id, episodeNumber }) => {
    setEpisodeStatus(id, episodeNumber, true);

    // if show isn't in list, add to watching by default
    const { statusOfCurrentMovie, currentShow } = this.state;
    if (!statusOfCurrentMovie) {
      try {
        addToList(currentShow, watchStates.watching);
        successToast(`Added ${currentShow.title} to ${parseName(watchStates.watching)}`);
      } catch (error) {
        errorToast("Something went wrong, please try again");
      }
    }
  }

  // passed down to EpisodePage -> Season -> EpisodeItem / EpisodeMobileItem
  removeEpisode = ({ id, episodeNumber }) => {
    setEpisodeStatus(id, episodeNumber, false);
  }

  // passed down to EpisodePage -> Season
  setSeason = (seasonNumber, add) => {
    const { episodes, statusOfCurrentMovie, currentShow } = this.state;
    setSeasonStatus(currentShow.id, seasonNumber, episodes.length, add);

    // if show isn't in list, add to watching by default
    if (!statusOfCurrentMovie && add) {
      try {
        addToList(currentShow, watchStates.watching);
        successToast(`Added ${currentShow.title} to ${parseName(watchStates.watching)}`);
      } catch (error) {
        errorToast("Something went wrong, please try again");
      }
    }
  }

  render() {
    return (
      <EpisodePage
        title={this.state.title}
        episodes={this.state.episodes}
        watchedEpisodes={this.state.watchedEpisodes}
        showId={this.props.match.params.id}
        seasonNumber={1}
        isLoading={this.state.isLoading}
        addEpisode={this.addEpisode}
        removeEpisode={this.removeEpisode}
        setSeason={this.setSeason}
      />
    );
  }
}

export default EpisodeContainer;
