import "./App.css";
import React, { createRef, useRef } from "react";
import classNames from "classnames";

const Cell = React.forwardRef(({ selected, letter, isScroller }, ref) => {
  const cls = classNames("noselect", "letters-cell", {
    "letters-cell-selected": selected,
    "letters-cell-scroller": isScroller,
  });
  if (isScroller) {
    return <div className={cls}></div>;
  }
  return (
    <div className={cls} ref={ref}>
      {letter}
    </div>
  );
});

function ControlButton({ kind, onClick, letter }) {
  return (
    <div className={`noselect control-button control-button-${kind}`}>
      <button className="noselect control-button-inner" onClick={onClick}>
        {letter}
      </button>
    </div>
  );
}

function Board({
  letters,
  selectedCol,
  selectedRow,
  mode,
  onSelectRow,
  onSelectRowAndCol,
}) {
  const rowRefs = useRef([]);
  const colRefs = useRef([]);
  const rowsCount = letters.length;
  const colsCount = letters[0].length;
  rowRefs.current = [...Array(rowsCount).keys()].map(
    (_, idx) => rowRefs.current[idx] ?? createRef()
  );
  colRefs.current = [...Array(colsCount).keys()].map(
    (_, idx) => colRefs.current[idx] ?? createRef()
  );

  function findRowIdx(lastTouch) {
    for (let idx = 0; idx < rowRefs.current.length; idx++) {
      const el = rowRefs.current[idx].current;
      const extraShift = el.offsetHeight;
      const top = el.offsetTop + extraShift;
      const bottom = el.offsetTop + el.offsetHeight + extraShift;
      if (top <= lastTouch.clientY && lastTouch.clientY <= bottom) {
        return idx;
      }
    }
    return null;
  }

  function findColIdx(lastTouch) {
    for (let idx = 0; idx < colRefs.current.length; idx++) {
      const el = colRefs.current[idx].current;
      // const extraShift = el.offsetWidth;
      const left = el.offsetLeft;
      const right = el.offsetLeft + el.offsetWidth;
      if (left <= lastTouch.clientX && lastTouch.clientX <= right) {
        return idx;
      }
    }
    return null;
  }

  function handleRowTouch(lastTouch, isTouchEnd) {
    const currentRowIdx = findRowIdx(lastTouch);
    const currentColIdx = findColIdx(lastTouch);
    if (currentColIdx != null && currentRowIdx != null) {
      onSelectRowAndCol(currentRowIdx, currentColIdx, isTouchEnd);
    } else if (currentRowIdx != null) {
      onSelectRow(currentRowIdx);
    }
  }

  function handleTouchStart(ev) {
    handleRowTouch(ev.changedTouches[0]);
  }

  function handleTouchMove(ev) {
    handleRowTouch(ev.changedTouches[0]);
  }

  function handleTouchEnd(ev) {
    handleRowTouch(ev.changedTouches[0], true);
  }

  const V_SCROLLER = "=";
  const H_SCROLLER = "&";
  let lettersWithPlaceholders = letters.map((row, rowIdx) =>
    rowIdx === 0 ? [V_SCROLLER, ...row] : [V_SCROLLER, ...row]
  );
  lettersWithPlaceholders.push([
    V_SCROLLER,
    ...[...Array(colsCount).keys()].map(() => H_SCROLLER),
  ]);

  const content = lettersWithPlaceholders.map((row, rowIdx) => {
    return (
      <div
        className={"letters-row"}
        key={rowIdx.toString()}
        ref={rowRefs.current[rowIdx]}
      >
        {row.map((letter, colIdx) => {
          const isVScroller = letter === V_SCROLLER;
          const isHScroller = letter === H_SCROLLER;

          // First column is V_SCROLLER, so real column index is one less.
          const colSelected = selectedCol === colIdx - 1;
          // For V_SCROLLER cell, highlight one below selected.
          const rowSelected = isVScroller
            ? selectedRow === rowIdx - 1
            : selectedRow === rowIdx;

          let cellSelected = false;
          if (mode === MODES.SELECTING_ROW) {
            cellSelected = rowSelected;
          } else {
            cellSelected = rowSelected && colSelected;
          }

          return (
            <Cell
              selected={cellSelected}
              isScroller={isVScroller || isHScroller}
              letter={letter}
              key={colIdx.toString()}
              ref={
                // Store references for first row only, excluding V_SCROLLER column.
                rowIdx === 0 && colIdx > 0 ? colRefs.current[colIdx - 1] : null
              }
            />
          );
        })}
      </div>
    );
  });

  return (
    <div
      className="letters-container"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {content}
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
  const placeholder = (text ?? "").length === 0;
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

  onSelectRow = (rowIdx) => {
    this.setState((state) => {
      const maxRow = state.letters.length - 1;
      const tryRow = Math.min(Math.max(0, rowIdx), maxRow);
      return {
        mode: MODES.SELECTING_ROW,
        selectedCol: state.selectedCol,
        selectedRow: tryRow,
      };
    });
  };

  onSelectRowAndCol = (rowIdx, colIdx, isTouchEnd) => {
    this.setState((state) => {
      const maxRow = state.letters.length - 1;
      const maxCol = state.letters[state.selectedRow].length - 1;
      const tryCol = Math.min(Math.max(0, colIdx), maxCol);
      const tryRow = Math.min(Math.max(0, rowIdx), maxRow);

      if (isTouchEnd) {
        const currentLetter =
          state.letters[state.selectedRow][state.selectedCol];
        return {
          mode: MODES.SELECTING_ROW,
          selectedCol: tryCol,
          selectedRow: tryRow,
          inputText: state.inputText + currentLetter,
        };
      }

      return {
        mode: MODES.SELECTING_COL,
        selectedCol: tryCol,
        selectedRow: tryRow,
      };
    });
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
        <Board
          letters={this.state.letters}
          selectedCol={this.state.selectedCol}
          selectedRow={this.state.selectedRow}
          mode={this.state.mode}
          onSelectRow={this.onSelectRow}
          onSelectRowAndCol={this.onSelectRowAndCol}
        />
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
