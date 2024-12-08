import React from 'react';

const Button = (props) => {
  return (
    <button className="btn border-2  rounded-pill px-4 py-1 bt"
    >
      {props.title}
    </button>
  );
};

export default Button;