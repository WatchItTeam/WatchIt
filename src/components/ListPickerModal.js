import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import PrimaryButton from "./PrimaryButton";
import parseName from "../utils/parseName";
import "../css/ListPickerModal.scss";

function ListItem({ value, current, onChange }) {
  return (
    <label htmlFor={`listform-${value}`}>
      <input
        type="radio"
        name="chosen-list"
        id={`listform-${value}`}
        value={value}
        checked={value === current}
        onChange={onChange}
      /> {parseName(value)}
    </label>
  );
}

ListItem.propTypes = {
  value: PropTypes.string.isRequired,
  current: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

class ListPickerModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    hideFunc: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
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
    onSubmit(current);
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
