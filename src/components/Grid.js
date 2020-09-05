import React, { useState, useEffect }  from 'react'
import Square from './Square';
import { useTrail, animated, useChain } from 'react-spring'
import { Animate, AnimateGroup } from 'react-simple-animate'

function An() {
  const config = { mass: 5, tension: 2000, friction: 200 }
  const [toggle, set] = useState(false)
  const trail = useTrail(5, {
    config,
    opacity: toggle ? 1 : 0,
    from: {opacity: toggle ? 0 : 1}
  })
  const test = ['a', 'b', 'c', 'd', 'e']
  return(<div onClick={() => set( state => !state)}>
    {/* {trail.map(({opacity}, index) => 
      <animated.div style={{opacity}} key={test[index]}>
        {test[index]}
      </animated.div>)} */
      <AnimateGroup play={toggle}>
      {test.map((e, i) => 
        <Animate 
          key={i}
          sequenceIndex={i}
          durationSeconds={0.1}
          start={{opacity:0}}
          end={{opacity:1}}
      >{e}</Animate>)
        
        }
      
      </AnimateGroup>}
  </div>)
}

/*function showToolTip(D_ij){
  print()

}*/

function highlightPath(path, D) {
  clearPath(D);
  for (let i = 0; i < path.length; i++) {
    document.getElementById(path[i]).style.backgroundColor = "red";
  }
}

function clearPath(D) {
  for (let i = 0; i < D.length; i++) {
    for (let j = 0; j < D[0].length; j++) {
      document.getElementById(D[i][j].id).style.backgroundColor =
        "white";
    }
  }
}
/*
useEffect(() => {
  highlightPath(this.props.D[this.props.D.length - 1][this.props.D[0].length - 1]
    .path, this.props.D)
});
*/
export default function Grid(props) { 
  // var config = { mass: 5, tension: 2000, friction: 200,  duration: 6000}//duration: props.D.length * props.D[0].length
  // const oref = useRef()

  const [toggle, set] = useState(true)
  // const trailRows = useTrail(props.D.length, {
  //   config,
  //   opacity: toggle ? 1 : 0,
  //   from: {opacity: toggle ? 0 : 1}
  // })

  //   config = { mass: 5, tension: 2000, friction: 200, duration: 1000}
  // var trails = [];
  // var refs = [];
  // const trail = useTrail(props.D[0].length, {
  //   config,
  //   opacity: 1,
  //   from: {opacity: 0}
  // })
  // for (var i = 0; i < props.D.length; i++) {
  //   const ref = {...oref};
  //   const trailCopy = Object.assign({}, trail);
  //   refs.push(ref)
  //   trails.push(trailCopy);
  // }
  // useChain(refs);
  const beginAnimate = true;
    
  useEffect(() => {
    highlightPath(props.D[props.D.length-1][props.D[0].length-1].path, props.D);
  }, [props]);

  return (
    <div onClick={() => set( state => !state)} >
      <table>
        <tbody>
          <tr>
            <td>
              <Square className="letter_square" />  
            </td>
            <td>
              <Square className="letter_square" />
            </td>
            {props.seq2.split("").map((c, i) => (
              <td key={i}>
                <Square value={c} className="letter_square" />
              </td>
            ))}
          </tr> 
          {props.D.map((row, i) => (
            <tr key={i}>
              <td>
                <Square   
                  value={props.seq1.charAt(i - 1)}
                  className="letter_square"
                />
              </td>
              {row.map((e, j) => (
                <td key={props.D[i][j].id}>
                
                  <div>
                    <Square
                      value={props.D[i][j].score}
                      className="score_square"
                      id={props.D[i][j].id}
                     // handleMouseOver={() => ;}
                      handleClick={() => highlightPath(props.D[i][j].path, props.D)}
                    />
                    </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ); 
}