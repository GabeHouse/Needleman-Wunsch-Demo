import React, { useEffect } from 'react'
import Square from './Square';

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
export default function Grid(props) {

  useEffect(() => {
    highlightPath(props.D[props.D.length - 1][props.D[0].length - 1].path, props.D);
  }, [props]);

  return (
    <div >
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