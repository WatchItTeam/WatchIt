import React, { Component } from "react";
import PropTypes from "prop-types";
import { DropTarget } from "react-dnd";
import { successToast } from "../utils/toast";

/**
 * This component is a drop zone for PosterCards
 */
class PosterCardDropTarget extends Component {
  static propTypes = {
    /** enables react-dnd */
    connectDropTarget: PropTypes.func.isRequired,
    /** is true if a PosterCard is hovering over */
    isOver: PropTypes.bool.isRequired,
    /** name of the drop target, used for the notification text */
    targetName: PropTypes.string.isRequired, // eslint-disable-line
    children: PropTypes.node.isRequired,
  }

  render() {
    const { connectDropTarget, isOver, children } = this.props;
    return connectDropTarget((
      <div className={isOver ? "droptarget-is-over" : ""}>
        {children}
      </div>
    ));
  }
}

const listTarget = {
  // is called when a PosterCard is dropped on this component
  drop(props, monitor) {
    const item = monitor.getItem();
    successToast(`Added ${item.title} to ${props.targetName}`);
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

// react to drop sources of type "PosterCard"
export default DropTarget("PosterCard", listTarget, collect)(PosterCardDropTarget);
