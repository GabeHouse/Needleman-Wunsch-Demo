import React from 'react';
import { animated } from 'react-spring';

function Square(props) {
  return (
    <div
      className={props.className}
      id={props.id}
      onClick={props.handleClick}
    >
      <animated.div>
        {props.value}
      </animated.div>
    </div>
  );
}

export default Square;
