import React, { Component } from "react";
import PropTypes from "prop-types";
import { filterOptions } from "helpers";
import { ClickOutsideWrapper } from "../ClickOutsideWrapper";

class Autocomplete extends Component {
  state = {
    display: false,
    search: "",
  };

  clickOutside = () => {
    this.setState({
      display: false,
    });
  };

  onFocus = () => {
    this.setState({ display: true, search: "" });
  };

  setOption = (value) => {
    const { onChange } = this.props;
    this.setState(
      {
        search: value,
        display: false,
      },
      onChange(value)
    );
  };

  onChange = (e) => {
    this.setState({ search: e.target.value });
  };

  renderOptions = () => {
    const { display, search } = this.state;
    const { options, showCustomValue } = this.props;
    const filteredOptions = filterOptions(options, search);
    let optionsList;

    if (display) {
      optionsList = filteredOptions.map((item, index) => {
        const key = `${item}_key_${index + 1}`;
        const onClick = () => this.setOption(item);

        return (
          <div className="option box" key={key}>
            <button type="button" className="item-button" onClick={onClick}>
              <span>{showCustomValue(item)}</span>
            </button>
          </div>
        );
      });
    }
    return optionsList;
  };

  render() {
    const { display, search } = this.state;
    const focused = display ? "focused" : "";
    return (
      <div className="main-wrapper">
        <ClickOutsideWrapper clickOutside={this.clickOutside}>
          <div className={`box ${focused}`}>
            <input
              type="text"
              onChange={this.onChange}
              onFocus={this.onFocus}
              value={search}
            />
            <div className={`item-list ${focused}`}>{this.renderOptions()}</div>
          </div>
        </ClickOutsideWrapper>
      </div>
    );
  }
}

Autocomplete.defaultProps = {
  showCustomValue: (value) => value,
};

Autocomplete.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  showCustomValue: PropTypes.func,
};

export default Autocomplete;
