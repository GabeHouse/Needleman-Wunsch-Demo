import React from "react";
import Grid from './components/Grid';

function align(a, b, matchScore, mismatchScore, gapScore) {
  //    b0 b1 bj ...
  // a0
  // a1   D[i,j] = {score, a, b} where score and a/b is the optimal score and
  // ai                          alignment for a0a1..ai and b0b1..bj
  // ...

  // init D
  let D = new Array(a.length + 1);
  for (let i = 0; i < a.length + 1; i++) {
    D[i] = new Array(b.length + 1);
    D[i][0] = { score: gapScore * i, a: a.substring(0, i), b: "-".repeat(i) };
    D[i][0].id = i + ",0";
    if (i > 0) {
      D[i][0].path = [...D[i - 1][0].path];
    } else {
      D[i][0].path = [];
    }
    D[i][0].path.push(D[i][0].id.valueOf());
  }
  for (let j = 0; j < b.length + 1; j++) {
    D[0][j] = { score: gapScore * j, a: "-".repeat(j), b: b.substring(0, j) };
    D[0][j].id = "0," + j.toString();
    if (j > 0) {
      D[0][j].path = [...D[0][j - 1].path];
    } else {
      D[0][j].path = [];
    }
    D[0][j].path.push(D[0][j].id.valueOf());
  }

  let str = "";

  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
      let f = b.charAt(j) === a.charAt(i) ? matchScore : mismatchScore;
      let score = Math.max(
        D[i][j].score + f,
        D[i][j + 1].score + gapScore,
        D[i + 1][j].score + gapScore
      );
      D[i + 1][j + 1] = {};
      D[i + 1][j + 1].score = score;
      D[i + 1][j + 1].id = i + 1 + "," + (j + 1);
      if (score === D[i][j].score + f) {
        D[i + 1][j + 1].a = D[i][j].a + a.charAt(i);
        D[i + 1][j + 1].b = D[i][j].b + b.charAt(j);
        D[i + 1][j + 1].path = [...D[i][j].path];
      } else if (score === D[i][j + 1].score + gapScore) {
        D[i + 1][j + 1].a = D[i][j + 1].a + a.charAt(i);
        D[i + 1][j + 1].b = D[i][j + 1].b + "-";
        D[i + 1][j + 1].path = [...D[i][j + 1].path];
      } else {
        D[i + 1][j + 1].a = D[i + 1][j].a + "-";
        D[i + 1][j + 1].b = D[i + 1][j].b + b.charAt(j);
        D[i + 1][j + 1].path = [...D[i + 1][j].path];
      }
      D[i + 1][j + 1].path.push(D[i + 1][j + 1].id.valueOf());
    }
  }
  str += matchScore + ", " + mismatchScore + ", " + gapScore + "\n";
  for (let i = 0; i < D.length; i++) {
    for (let j = 0; j < D[0].length; j++) {
      str += D[i][j].score + " ";
    }
    str += "\n";
  }
  // alert(str);
  return D;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    let seq1 = "GACR",
      seq2 = "SDFSR";
    this.state = {
      seq1: seq1,
      seq2: seq2,
      matchScore: 1,
      mismatchScore: 3,
      gapScore: -1,
      D: align(seq1, seq2, 1, 3, -1),
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    if (event.target.id === "seq1") {
      this.setState({ seq1: event.target.value });
    } else if (event.target.id === "seq2") {
      this.setState({ seq2: event.target.value });
    } else if (event.target.id === "match") {
      this.setState({ matchScore: event.target.value });
    } else if (event.target.id === "mismatch") {
      this.setState({ mismatchScore: event.target.value });
    } else if (event.target.id === "gap" && !isNaN(event.target.value)) {
      this.setState({ gapScore: event.target.value });
    }
    if (
      !isNaN(this.state.matchScore) &&
      !isNaN(this.state.mismatchScore) &&
      !isNaN(this.state.gapScore)
    ) {
    }
  }
  render() {
    let matchScore = isNaN(parseInt(this.state.matchScore))
      ? 0
      : parseInt(this.state.matchScore);
    let mismatchScore = isNaN(parseInt(this.state.mismatchScore))
      ? 0
      : parseInt(this.state.mismatchScore);
    let gapScore = isNaN(parseInt(this.state.gapScore))
      ? 0
      : parseInt(this.state.gapScore);
    let D = align(
      this.state.seq1,
      this.state.seq2,
      matchScore,
      mismatchScore,
      gapScore
    );
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                <label>Sequence 1</label>
              </td>
              <td colSpan="4">
                <input
                  type="text"
                  id="seq1"
                  className="seq"
                  value={this.state.seq1}
                  maxLength="20"
                  onChange={this.handleChange}
                ></input>
              </td>
              <td rowSpan="10" id="result">
                <table id="alignment">
                  <tbody>
                    <tr>
                      <td>
                        {D[this.state.seq1.length][this.state.seq2.length].a}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {D[this.state.seq1.length][this.state.seq2.length].b}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {
                          D[this.state.seq1.length][this.state.seq2.length]
                            .score
                        }
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <label>Sequence 2</label>
              </td>
              <td colSpan="4">
                <input
                  type="text"
                  id="seq2"
                  className="seq"
                  value={this.state.seq2}
                  maxLength="20"
                  onChange={this.handleChange}
                ></input>
              </td>
            </tr>
            <tr colSpan="4">
              <th>
                <label>Match Score</label>
              </th>
              <th>
                <label>Mismatch Score</label>
              </th>
              <th>
                <label>Gap Score</label>
              </th>
            </tr>
            <tr>
              <td>
                <input
                  className="params"
                  id="match"
                  type="number"
                  value={this.state.matchScore}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                <input
                  className="params"
                  id="mismatch"
                  type="number"
                  value={this.state.mismatchScore}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                <input
                  className="params"
                  id="gap"
                  type="number"
                  value={this.state.gapScore}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <Grid D={D} seq1={this.state.seq1} seq2={this.state.seq2} />
      </div>
    );
  }
}

export default App;
