import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { watchStates } from "../Firebase/lists";
import PrimaryButton from "../components/PrimaryButton";
import ListPickerRadio from "../components/ListPickerRadio";
import "../css/ListPickerModal.scss";

/**
 * Component for the popup modal that appears when clicking the
 * Add to button on the movie details page.
 * Can be dismissed with the Esc key and submitted with enter.
 */
class ListPickerModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    hideFunc: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    statusOfCurrent: PropTypes.string, // eslint-disable-line
  }

  static defaultProps = {
    statusOfCurrent: "",
  }

  /**
   * We read the value of statusOfCurrent so that if the currentMovie
   * already is in one of the user's lists, the correct radio button will
   * be checked by default
   */
  static getDerivedStateFromProps(props) {
    return {
      current: props.statusOfCurrent,
    };
  }

  state = { current: "" }
  formRef = React.createRef();

  componentDidMount() {
    window.addEventListener("keydown", this.keyListener);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.keyListener);
  }

  keyListener = (event) => {
    const { isOpen } = this.props;
    if (event.key === "Escape" && isOpen) {
      this.cancelModal();
    } else if (event.key === "Enter" && isOpen) {
      this.onSaveClick();
    }
  }

  onRadioChange = (event) => {
    this.setState({ current: event.target.value });
  }

  cancelModal = () => {
    this.formRef.current.reset();
    this.props.hideFunc();
  }

  onSaveClick = () => {
    const { current } = this.state;
    const { onSubmit, hideFunc, statusOfCurrent } = this.props;

    // only call onSubmit if the user has actually selected
    // one of the lists, skip if no list is selected or
    // if the user doesn't change selected list
    if (current && current !== statusOfCurrent) {
      onSubmit(current);
    }
    hideFunc();
  }

  render() {
    const { isOpen } = this.props;
    const { current } = this.state;
    const { cancelModal, onRadioChange, onSaveClick } = this;
    return (
      <Fragment>
        <div className={`listpicker-modal ${isOpen ? "open" : "closed"}`}>
          <h1>Add to:</h1>
          <form ref={this.formRef}>
            {
              // dynamically add a radio button for each watch state
              // instead of hard coding them
              Object.values(watchStates).map(state => (
                <ListPickerRadio
                  key={state}
                  value={state}
                  current={current}
                  onChange={onRadioChange}
                />
              ))
            }
          </form>
          <div className="buttons">
            <button className="cancel-btn" onClick={cancelModal}>Cancel</button>
            <PrimaryButton onClick={onSaveClick}>Save</PrimaryButton>
          </div>
        </div>
        <div
          className={isOpen ? "modal-underlay open" : "modal-underlay closed"}
          onClick={cancelModal}
          role="presentation"
        />
      </Fragment>
    );
  }
}

export default ListPickerModal;
