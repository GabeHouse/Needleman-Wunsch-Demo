import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

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

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

