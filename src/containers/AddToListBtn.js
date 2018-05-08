import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import firebase from "../Firebase/firebase";
import { addToList, fetchOneFromList } from "../Firebase/lists";
import { successToast, errorToast } from "../utils/toast";
import { withUser } from "../Firebase/UserContext";
import { normalizeMovie } from "../api/APIUtils";
import parseName from "../utils/parseName";
import PrimaryButton from "../components/PrimaryButton";
import ListPickerModal from "../components/ListPicker/ListPickerModal";

class AddToListBtn extends Component {
  static propTypes = {
    currentMovie: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  }

  state = {
    isLoading: false,
    modalIsOpen: false,
    statusOfCurrentMovie: null,
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.checkStatusOfCurrentMovie();
      }
    });
  }

  async checkStatusOfCurrentMovie() {
    this.setState({ isLoading: true });
    const { user, currentMovie } = this.props;
    const movie = await fetchOneFromList(user.uid, currentMovie.id);
    console.log(movie);
    if (movie && movie.watch_status) {
      console.log(movie.watch_status);
      this.setState({ statusOfCurrentMovie: movie.watch_status });
    }
    this.setState({ isLoading: false });
  }

  showModal = () => {
    this.setState({ modalIsOpen: true });
  }

  hideModal = () => {
    this.setState({ modalIsOpen: false });
  }

  onModalSubmit = async (selectedList) => {
    this.setState({ isLoading: true });

    const { currentMovie } = this.props;
    const movie = normalizeMovie(currentMovie);
    try {
      await addToList(movie, selectedList);
      successToast(`Added ${movie.title} to ${parseName(selectedList)}`);
      this.setState({ statusOfCurrentMovie: selectedList });
    } catch (error) {
      errorToast(`Something went wrong when adding ${movie.title}`);
    }
    this.setState({ isLoading: false });
  }

  render() {
    const { isLoading, modalIsOpen, statusOfCurrentMovie } = this.state;
    const { user } = this.props;
    const { onModalSubmit, hideModal, showModal } = this;

    let label;
    if (isLoading) {
      label = "Loading...";
    } else if (statusOfCurrentMovie && user) {
      label = (
        <span>
          <FontAwesomeIcon icon="check-square" />
          &nbsp;
          {parseName(statusOfCurrentMovie)}
        </span>
      );
    } else {
      label = "+ Add to";
    }
    const disabled = isLoading || user.status !== "signedIn";

    return (
      <Fragment>
        <PrimaryButton onClick={showModal} disabled={disabled}>
          {label}
        </PrimaryButton>
        <ListPickerModal
          isOpen={modalIsOpen}
          hideFunc={hideModal}
          onSubmit={onModalSubmit}
          statusOfCurrent={statusOfCurrentMovie}
        />
      </Fragment>
    );
  }
}

export default withUser(AddToListBtn);
