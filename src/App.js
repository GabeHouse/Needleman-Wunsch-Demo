import React from "react";
import Grid from './components/Grid';

function align(a, b, matchScore, mismatchScore, gapScore) {
  //    b0 b1 bj ...
  // a0
  // a1   D[i,j] = {score, a, b} where score and a/b is the optimal score and
  // ai                          alignment for a0a1..ai and b0b1..bj
  // ...

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
  return D;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    let seq1 = "AATCTAG",
      seq2 = "ATCGGTCG";
    this.state = {
      seq1: seq1,
      seq2: seq2,
      matchScore: 1,
      mismatchScore: -1,
      gapScore: -1,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    if (event.target.id === "seq1") {
      this.setState({ seq1: event.target.value.toString().toUpperCase() });
    } else if (event.target.id === "seq2") {
      this.setState({ seq2: event.target.value.toString().toUpperCase() });
    } else if (event.target.id === "match") {
      this.setState({ matchScore: event.target.value });
    } else if (event.target.id === "mismatch") {
      this.setState({ mismatchScore: event.target.value });
    } else if (event.target.id === "gap" && !isNaN(event.target.value)) {
      this.setState({ gapScore: event.target.value });
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
      <div id="main">
        <p>

          I was introduced to the <a href="https://en.wikipedia.org/wiki/Needleman%E2%80%93Wunsch_algorithm">Needleman-Wunsch algorithm </a>during a fourth year CS course in the context of computing the optimal alignment of two DNA sequences. What is so fascinating about the algorithm is its simplicity, yet its ability to reduce to other popular dynamic programming problems such as <button onClick={() => {this.setState({matchScore: 1, mismatchScore: 0, gapScore: 0})}}>Longest Common Subsequence</button>  and <button onClick={() => {this.setState({matchScore: 0, mismatchScore: -1, gapScore: -1})}}>Edit Distance</button> by changing the score scheme. The Needleman-Wunsch algorithm is still widely used in areas like bioinformatics, where its quadratic time and linear space complexities make it effective for aligning extremely long strings.<br /><br />

          The problem is solved by the recurrence relation:
          \(\texttt{'{ D[i, j] = max}'}
          \begin{'{cases}'}
          \texttt{'{D[i-1, j-1] + f(S[i], T[j])}'}\\
          \texttt{'{D[i-1, j] + f(S[i], -)}'}\\
          \texttt{'{D[i, j-1] + f(-, T[j])}'}
          \end{'{cases}'}
          \)
          , where <span className="mono">D[i, j]</span> holds the optimal alignment score for <span className="mono">S[:i]</span> and <span className="mono">T[:j]</span>, '-' denotes a gap, and f is the scoring function.

        </p>
        <table id="param_result" style={{paddingTop:"20px"}}>
          <tr>

            <td>
              <tr>
                <td>
                  <label className="param_label"> Sequence S</label>
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
              </tr>
              <tr>
                <td>
                  <label className="param_label">Sequence T</label>
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
              <tr>
                <td>
                  <table>
                    <tr>
                      <label className="param_label">Match Score</label>
                    </tr>
                    <tr>
                      <input
                        className="params"
                        id="match"
                        type="number"
                        value={this.state.matchScore}
                        onChange={this.handleChange}
                      />
                    </tr>
                  </table>
                </td>
                <td>
                  <table>
                    <tr>
                      <label className="param_label">Mismatch Score</label>
                    </tr>
                    <tr>
                      <input
                        className="params"
                        id="mismatch"
                        type="number"
                        value={this.state.mismatchScore}
                        onChange={this.handleChange}
                      />
                    </tr>

                  </table>
                </td>
                <td>
                  <table>
                    <tr>
                      <label className="param_label">Gap Score</label>
                    </tr>
                    <tr>
                      <input
                        className="params"
                        id="gap"
                        type="number"
                        value={this.state.gapScore}
                        onChange={this.handleChange}
                      />
                    </tr>
                  </table>
                </td>
              </tr>
            </td>

            <td rowSpan="10" id="result" >
              <table id="alignment"  >
                <tr>
                  <table >
                    <tbody>
                      <tr>
                        {D[this.state.seq1.length][this.state.seq2.length].a.split('').map((c, i) => <td>{c}</td>)}
                      </tr>
                      <tr>
                        {D[this.state.seq1.length][this.state.seq2.length].b.split('').map((c, i) => <td>{c}</td>)}
                      </tr>
                    </tbody>
                  </table>
                </tr>
                <tr>
                  {'Score: ' + D[this.state.seq1.length][this.state.seq2.length].score}
                </tr>
              </table>
            </td>

          </tr>
        </table>
        <div>
          <Grid D={D} seq1={this.state.seq1} seq2={this.state.seq2} />
        </div>
      </div>
    );
  }
}

export default App;
