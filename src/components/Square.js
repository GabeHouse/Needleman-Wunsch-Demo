import React from 'react';

function Square(props) {
  return (
    <div
      className={props.className}
      id={props.id}
      onMouseOver={props.handleMouseOver}
      onMouseOut={props.handleMouseOut}
    >
      {props.value}
    </div>
  );
}

export default Square;