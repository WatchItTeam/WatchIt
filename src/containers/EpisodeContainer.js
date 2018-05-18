import React, { Component } from "react";
import PropTypes from "prop-types";
import EpisodePage from "../components/Episodes/EpisodePage";
import { getSeasonFromId, getTVInfo, normalizeMovie } from "../api/APIUtils";
import { successToast, errorToast } from "../utils/toast";
import firebase from "../Firebase/firebase";
import parseName from "../utils/parseName";
import { withUser } from "../Firebase/UserContext";
import {
  setEpisodeStatus, onShowSnapshot, addToList, watchStates, setSeasonStatus,
} from "../Firebase/lists";

class EpisodeContainer extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    currentMovie: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired, // from react router
    user: PropTypes.object.isRequired, // from withUser
  }

  state = {
    currentSeason: 1,
    numberOfSeasons: 1,
    episodes: [],
    title: "",
    currentShow: {},
    isLoading: true,
    watchedEpisodes: {},
    /* the watch status/list the current show is in, if the user has already added it */
    statusOfCurrentMovie: null,
  };

  componentDidMount() {
    // wait until the user has signed in to check their watch status
    // of the current movie
    this.props.user.onChange((user) => {
      if (user) {
        this.checkCurrentShow(user);
      }
    });
    this.loadSeason();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.loadSeason();
      if (this.props.user.status === "signedIn") {
        this.checkCurrentShow(this.props.user);
      }
    }
  }

  loadSeason() {
    this.setState({ isLoading: true });
    const { id, seasonNumber } = this.props.match.params;

    let season;
    if (seasonNumber === "all") {
      season = getSeasonFromId(id, this.state.currentSeason);
    } else {
      season = getSeasonFromId(id, (seasonNumber || 1));
    }

    const { currentMovie } = this.props;
    let tvInfo;
    if (!currentMovie || currentMovie.id !== id) {
      tvInfo = getTVInfo(this.props.match.params.id);
    } else {
      tvInfo = Promise.resolve(currentMovie);
    }

    Promise.all([season, tvInfo]).then(([episodes, show]) => {
      this.setState({
        numberOfSeasons: show.number_of_seasons,
        title: show.name,
        currentShow: normalizeMovie(show),
        episodes,
        isLoading: false,
      });
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
  addEpisode = async ({ id, seasonNumber, episodeNumber }) => {
    setEpisodeStatus(id, seasonNumber, episodeNumber, true);

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
  removeEpisode = ({ id, seasonNumber, episodeNumber }) => {
    setEpisodeStatus(id, seasonNumber, episodeNumber, false);
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
    const { id, seasonNumber } = this.props.match.params;
    return (
      <EpisodePage
        title={this.state.title}
        episodes={this.state.episodes}
        numberOfSeasons={this.state.numberOfSeasons}
        watchedEpisodes={this.state.watchedEpisodes}
        showId={id}
        seasonNumber={seasonNumber}
        isLoading={this.state.isLoading}
        addEpisode={this.addEpisode}
        removeEpisode={this.removeEpisode}
        setSeason={this.setSeason}
      />
    );
  }
}

export default withUser(EpisodeContainer);
