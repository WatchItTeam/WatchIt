import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import PrimaryButton from "../PrimaryButton";
import ListItem from "./ListItem";
import "../../css/ListPickerModal.scss";

/**
 * Component for the popup modal that appears when clicking the
 * Add to button on the movie details page.
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

  onRadioChange = (event) => {
    this.setState({ current: event.target.value });
  }

  cancelModal = () => {
    this.formRef.current.reset();
    this.props.hideFunc();
  }

  onSaveClick = () => {
    const { current } = this.state;
    const { onSubmit, hideFunc } = this.props;

    // only call onSubmit if the user has actually selected
    // one of the lists, otherwise skip
    if (current) {
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
            <ListItem value="watching" current={current} onChange={onRadioChange} />
            <ListItem value="plan_to_watch" current={current} onChange={onRadioChange} />
            <ListItem value="completed" current={current} onChange={onRadioChange} />
            <ListItem value="dropped" current={current} onChange={onRadioChange} />
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
