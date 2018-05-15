import React, { Component } from "react";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import "../css/Scroll.scss";

/**
 * This component makes the browser scroll to the top of the page when the route changes
 * Taken from https://reacttraining.com/react-router/web/guides/scroll-restoration
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
    const containerWidth = this.scrollRef.current.offsetWidth;
    this.scrollRef.current.scrollLeft += containerWidth;
  }
  scrollLeft = () => {
    const containerWidth = this.scrollRef.current.offsetWidth;
    this.scrollRef.current.scrollLeft -= containerWidth;
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
        <button className="leftbutton scroll-button" onClick={this.scrollLeft}><FontAwesomeIcon icon="angle-left" /></button>
        <div className="scrolling-wrapper-flexbox" ref={this.scrollRef}>
          {this.props.children}
        </div>
        <button className="rightbutton scroll-button" onClick={this.scrollRight}><FontAwesomeIcon icon="angle-right" /></button>
      </div>
    );
  }
}

export default Scroll;
