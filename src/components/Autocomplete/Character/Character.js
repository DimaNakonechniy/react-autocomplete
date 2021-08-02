import React from "react";
import PropTypes from "prop-types";

const Character = ({ name, image }) => {
  return (
    <div className="item">
      <div className="item-name">{name}</div>
      <div className="item-image">
        <img src={image} alt={name} />
      </div>
    </div>
  );
};

Character.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default Character;
