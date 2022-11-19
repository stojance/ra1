import React from "react";
import PropTypes from "prop-types";

const PageDown = ({ handleClick, isDisabled }) => (
  <button
    onClick={handleClick}
    className="btn btn-primary"
    disabled={isDisabled}
  >
    <i className="fa fa-angle-double-left"></i>
  </button>
);
PageDown.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
};

const PageUp = ({ handleClick, isDisabled }) => (
  <button
    onClick={handleClick}
    className="btn btn-primary float-right"
    disabled={isDisabled}
  >
    <i className="fa fa-angle-double-right"></i>
  </button>
);
PageUp.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
};

export { PageDown, PageUp };
