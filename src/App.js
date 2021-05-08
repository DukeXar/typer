import "./App.css";
import React from "react";

class Cell extends React.Component {
  render() {
    return (
      <div
        className={
          this.props.selected
            ? "letters-cell letters-cell-selected"
            : "letters-cell"
        }
      >
        {this.props.letter}
      </div>
    );
  }
}

class Board extends React.Component {}

const LETTERS = [
  "АБВГД".split(""),
  "ЕЁЖЗИ".split(""),
  "ЙКЛМН".split(""),
  "ОПРСТ".split(""),
  "УФХЦЧ".split(""),
  "ШЩЪЫЬ".split(""),
  "ЭЮЯ.,".split(""),
];

class DisplayText extends React.Component {
  render() {
    return <div className="display-text">{this.props.text}</div>;
  }
}

const MODES = {
  SELECTING_ROW: "SELECTING_ROW",
  SELECTING_COL: "SELECTING_COL",
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      letters: LETTERS,
      selectedRow: 0,
      selectedCol: 0,
      inputText: "",
      mode: MODES.SELECTING_ROW,
    };
  }

  renderLetters() {
    return this.state.letters.map((row, rowIdx) => {
      return (
        <div className={"letters-row"}>
          {row.map((letter, colIdx) => {
            const colSelected = this.state.selectedCol === colIdx;
            const rowSelected = this.state.selectedRow === rowIdx;

            let cellSelected = false;
            if (this.state.mode === MODES.SELECTING_ROW) {
              cellSelected = rowSelected;
            } else {
              cellSelected = rowSelected && colSelected;
            }
            return <Cell selected={cellSelected} letter={letter} />;
          })}
        </div>
      );
    });
  }

  componentDidMount() {
    document.addEventListener("keydown", this.onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyDown);
  }

  onKeyDown = (e) => {
    switch (e.code) {
      case "ArrowLeft":
        this.moveDelta(-1, 0);
        break;
      case "ArrowUp":
        this.moveDelta(0, -1);
        break;
      case "ArrowDown":
        this.moveDelta(0, 1);
        break;
      case "ArrowRight":
        this.moveDelta(1, 0);
        break;
      case "Enter":
        this.action();
        break;
      case "Backspace":
        this.backspace();
        break;
      default:
        console.log(`Handling key code="${e.code}"`);
    }
  };

  action() {
    this.setState((state) => {
      const mode =
        state.mode === MODES.SELECTING_ROW
          ? MODES.SELECTING_COL
          : MODES.SELECTING_ROW;

      let stateUpdate = { mode };

      if (state.mode === MODES.SELECTING_COL) {
        const currentLetter = state.letters[state.selectedRow][
          state.selectedCol
        ];
        stateUpdate.inputText = state.inputText + currentLetter;
        stateUpdate.selectedCol = 0;
        stateUpdate.selectedRow = 0;
      }

      return stateUpdate;
    });
  }

  finishWord() {
    this.setState((state) => {
      const inputText = state.inputText.length > 0 ? state.inputText + " " : "";
      return {
        inputText,
        selectedCol: 0,
        selectedRow: 0,
      };
    });
  }

  backspace() {
    this.setState((state) => {
      const inputText =
        state.inputText.length > 0
          ? state.inputText.substring(0, state.inputText.length - 1)
          : "";
      return {
        inputText,
      };
    });
  }

  moveDelta(dCol, dRow) {
    this.setState((state, props) => {
      if (state.mode === MODES.SELECTING_COL && dRow !== 0) {
        return {
          mode: MODES.SELECTING_ROW,
          selectedCol: 0,
        }
      }
      if (state.mode === MODES.SELECTING_COL) {
        dRow = 0;
      } else {
        dCol = 0;
      }
      const maxRow = state.letters.length - 1;
      const maxCol = state.letters[state.selectedRow].length - 1;
      const tryCol = Math.min(Math.max(0, state.selectedCol + dCol), maxCol);
      const tryRow = Math.min(Math.max(0, state.selectedRow + dRow), maxRow);
      return {
        selectedCol: tryCol,
        selectedRow: tryRow,
      };
    });
  }

  render() {
    return (
      <div className="App">
        <div className="letters-container">{this.renderLetters()}</div>
        <DisplayText text={this.state.inputText} />
        <div>
          Current row={this.state.selectedRow}, col={this.state.selectedCol}
        </div>
      </div>
    );
  }
}

export default App;
