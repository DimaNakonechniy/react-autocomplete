import React, { Component } from "react";
import PropTypes from "prop-types";

class ClickOutsideWrapper extends Component {
  wrapperRef = React.createRef();

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  }

  handleClickOutside = (e) => {
    if (this.wrapperRef && !this.wrapperRef.current.contains(e.target)) {
      const { clickOutside } = this.props;
      clickOutside(e);
    }
  };

  render() {
    const { children } = this.props;
    return <div ref={this.wrapperRef}>{children}</div>;
  }
}

ClickOutsideWrapper.propTypes = {
  clickOutside: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default ClickOutsideWrapper;
