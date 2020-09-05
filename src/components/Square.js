import React from 'react';
import { animated } from 'react-spring';

// function Num(props) {
//   return(
//     <div style={{opacity: 0}}>
//       {props.value}
//     </div>
//   )
// }

function Square(props) {
  return (
    <div
      className={props.className}
      id={props.id}
    //  onMouseOver={props.handleMouseOver}
    //  onMouseOut={props.handleMouseOut}
      onClick={props.handleClick}
    >
      <animated.div>
        {props.value}
      </animated.div>
    </div>
  );
}

export default Square;
