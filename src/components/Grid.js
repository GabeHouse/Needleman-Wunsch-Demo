import React from 'react';
import Square from './Square';
import {useSpring, animated} from 'react-spring';

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.highlightPath = this.highlightPath.bind(this);
  }

  clearPath() {
    for (let i = 0; i < this.props.D.length; i++) {
      for (let j = 0; j < this.props.D[0].length; j++) {
        document.getElementById(this.props.D[i][j].id).style.backgroundColor =
          "white";
      }
    }
  }

  highlightPath(path) {
    this.clearPath();
    for (let i = 0; i < path.length; i++) {
      document.getElementById(path[i]).style.backgroundColor = "red";
    }
  }
  handleMouseExit() {
   // this.clearPath();
  }
  render() {
    return (
      <div
 /*     onMouseOut={() =>
          this.highlightPath(
            this.props.D[this.props.D.length - 1][this.props.D[0].length - 1]
              .path
          )
        }*/
      >
        <table>
          <tbody>
            <tr>
              <td>
                <Square className="letter_square" />
              </td>
              <td>
                <Square className="letter_square" />
              </td>
              {this.props.seq2.split("").map((c, i) => (
                <td key={i}>
                  <Square value={c} className="letter_square" />
                </td>
              ))}
            </tr>
            {this.props.D.map((row, i) => (
              <tr key={i}>
                <td>
                  <Square
                    value={this.props.seq1.charAt(i - 1)}
                    className="letter_square"
                  />
                </td>
                {row.map((e) => (
                  <td key={e.id}>
                    <Square
                      value={e.score}
                      className="score_square"
                      id={e.id}
                      handleMouseOver={() => this.highlightPath(e.path)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Grid;