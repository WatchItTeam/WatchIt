import React, { Component } from "react";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import "../css/Scroll.scss";

/**
 * This component makes the browser scroll to the top of the page when the route changes
 * Taken from https://reacttraining.com/react-router/web/guides/scroll-restoration
 */
class Scroll extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth });
  }

  scrollRight = () => {
    const containerWidth = this.inputRef.current.offsetWidth;
    this.inputRef.current.scrollLeft += containerWidth;
  }
  scrollLeft = () => {
    const containerWidth = this.inputRef.current.offsetWidth;
    this.inputRef.current.scrollLeft -= containerWidth;
  }

  inputRef = React.createRef();

  static propTypes = {
    children: PropTypes.node.isRequired,
    arrayLength: PropTypes.number.isRequired,
  }

  render() {
    let result = <div className="OuterDiv" />;
    if ((this.props.arrayLength * 170) < (this.state.width - 250)) {
      result = (
        <div className="OuterDiv">
          <div className="scrolling-wrapper-flexbox" ref={this.inputRef}>
            {this.props.children}
          </div>
        </div>
      );
    } else {
      result = (
        <div className="OuterDiv">
          <button className="leftbutton scroll-button" onClick={this.scrollLeft}><FontAwesomeIcon icon="angle-left" /></button>
          <div className="scrolling-wrapper-flexbox" ref={this.inputRef}>
            {this.props.children}
          </div>
          <button className="rightbutton scroll-button" onClick={this.scrollRight}><FontAwesomeIcon icon="angle-right" /></button>
        </div>
      );
    }
    return result;
  }
}

export default Scroll;
