import React, { Component } from "react";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import smoothScrollTo from "../utils/smoothScroll";
import "../css/Scroll.scss";

/**
 * Component for a horizontal scrolling list
 */
class Scroll extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    arrayLength: PropTypes.number.isRequired,
  }

  state = {
    width: 0,
  };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth });
  }

  scrollRight = () => {
    const elem = this.scrollRef.current;
    const { offsetWidth, scrollLeft } = elem;
    const scrollDistance = offsetWidth * 0.66;
    smoothScrollTo(elem, scrollLeft + scrollDistance, 400);
  }

  scrollLeft = () => {
    const elem = this.scrollRef.current;
    const { offsetWidth, scrollLeft } = elem;
    const scrollDistance = offsetWidth * 0.66;
    smoothScrollTo(elem, scrollLeft - scrollDistance, 400);
  }

  scrollRef = React.createRef();

  render() {
    // Fixed width of all postercard images such as cast and recommendations.
    const imageWidth = 170;
    // sidebar width is constant 250px.
    const sidebarWidth = 250;
    if ((this.props.arrayLength * imageWidth) < (this.state.width - sidebarWidth)) {
      return (
        <div className="OuterDiv">
          <div className="scrolling-wrapper-flexbox" ref={this.scrollRef}>
            {this.props.children}
          </div>
        </div>
      );
    }

    return (
      <div className="OuterDiv">
        <button className="leftbutton scroll-button" onClick={this.scrollLeft}>
          <FontAwesomeIcon icon="angle-left" />
        </button>
        <div className="scrolling-wrapper-flexbox" ref={this.scrollRef}>
          {this.props.children}
        </div>
        <button className="rightbutton scroll-button" onClick={this.scrollRight}>
          <FontAwesomeIcon icon="angle-right" />
        </button>
      </div>
    );
  }
}

export default Scroll;
