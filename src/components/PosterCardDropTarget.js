import React, { Component } from "react";
import PropTypes from "prop-types";
import { DropTarget } from "react-dnd";

/**
 * This component is a drop zone for PosterCards
 */
class PosterCardDropTarget extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired, // enables react-dnd
    isOver: PropTypes.bool.isRequired, // is true if a PosterCard is hovering over
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
    console.log(monitor.getItem());
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
