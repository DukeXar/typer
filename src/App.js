import "./App.css";
import React from "react";
import classNames from "classnames";

function Cell({ selected, letter }) {
  const cls = classNames("noselect", "letters-cell", {
    "letters-cell-selected": selected,
  });
  return <div className={cls}>{letter}</div>;
}

function ControlButton({ kind, onClick, letter }) {
  return (
    <div className={`noselect control-button control-button-${kind}`}>
      <button className="noselect control-button-inner" onClick={onClick}>
        {letter}
      </button>
    </div>
  );
}

function Controller({ onLeft, onRight, onUp, onDown, onCenter, onBackspace }) {
  return (
    <div className="controller">
      <ControlButton kind="left" letter="⬅️" onClick={onLeft} />
      <ControlButton kind="right" letter="➡️" onClick={onRight} />
      <ControlButton kind="up" letter="⬆️" onClick={onUp} />
      <ControlButton kind="down" letter="⬇️" onClick={onDown} />
      <ControlButton kind="center" letter="🟢" onClick={onCenter} />
      <ControlButton kind="backspace" letter="⏮" onClick={onBackspace} />
    </div>
  );
}

const LETTERS = [
  "АБВГД".split(""),
  "ЕЁЖЗИ".split(""),
  "ЙКЛМН".split(""),
  "ОПРСТ".split(""),
  "УФХЦЧ".split(""),
  "ШЩЪЫЬ".split(""),
  "ЭЮЯ.,".split(""),
];

function DisplayText({ text }) {
  const placeholder = (text ?? "").length == 0;
  const placeholderText = "Здесь будет текст";
  const cls = classNames("noselect", "display-text", {
    "display-text-placeholder": placeholder,
  });
  return <div className={cls}>{placeholder ? placeholderText : text}</div>;
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
        this.onLeft();
        break;
      case "ArrowUp":
        this.onUp();
        break;
      case "ArrowDown":
        this.onDown();
        break;
      case "ArrowRight":
        this.onRight();
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
        const currentLetter =
          state.letters[state.selectedRow][state.selectedCol];
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
        };
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

  onLeft = () => {
    this.moveDelta(-1, 0);
  };

  onRight = () => {
    this.moveDelta(1, 0);
  };

  onUp = () => {
    this.moveDelta(0, -1);
  };

  onDown = () => {
    this.moveDelta(0, 1);
  };

  onCenter = () => {
    this.action();
  };

  onBackspace = () => {
    this.backspace();
  };

  render() {
    return (
      <div className="App">
        <DisplayText text={this.state.inputText} />
        <div className="letters-container">{this.renderLetters()}</div>
        <Controller
          onLeft={this.onLeft}
          onRight={this.onRight}
          onCenter={this.onCenter}
          onUp={this.onUp}
          onDown={this.onDown}
          onBackspace={this.onBackspace}
        />
      </div>
    );
  }
}

export default App;
