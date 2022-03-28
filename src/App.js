/* eslint-disable default-case */
import './style.css'
import DigitButton from './DigitButton'
import OperationButton from './OperationButton'
import { useReducer } from 'react'

// action
export const ACTION = {
  // add digit is when clicking digits
  ADD_DIGIT: 'add-digit',
  // operation is add/div/time
  CHOOSE_OPERATION: 'choose-operation',
  // clear entire digits
  CLEAR: 'clear',
  // remove a digit
  DEL_DIGIT: 'delete-digit',
  // equal to calculate
  EVALUATE: 'evaluate',
}

// break the action to type and payload we have different type of action and number in as payload
const reducer = (state, { type, payload }) => {
  switch (type) {
    // ------------  case adding the digits ------------
    case ACTION.ADD_DIGIT:
      // 2 edge case
      // if current is 0 and we cant add another 0;
      if (payload.digit === "0" && state.curOperand === "0") return state;
      // fi current already has period we cant add another one
      if (payload.digit === "." && state.curOperand.includes(".")) return state;
      // spread out the state then update curOperand when click digit
      // if first time click then we gives the empty string to link the digit
      return {
        ...state,
        curOperand: `${state.curOperand || ""}${payload.digit}`,
      }

    // ------------ case for operation --------------------
    case ACTION.CHOOSE_OPERATION:
      // if operation clicked and no number in
      if (state.curOperand == null && state.prevOperand == null) return state;

      // dont have pre number but have current we spread out the state and update
      // 1. operation payload 2. prev will be the current 3. current becomes null
      if (state.prevOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          prevOperand: state.curOperand,
          curOperand: null,
        }
      }

      if (state.curOperand == null) {
        return {
          ...state,
          operation: payload.operation
        }
      }

      // default the case spread the state prevOperand will update based on evaluate function
      // operation is that we click // cur will be null
      return {
        ...state,
        prevOperand: evaluate(state),
        operation: payload.operation,
        curOperand: null
      }
    // ------------ case clear just set the state to empty object --------------------
    case ACTION.CLEAR:
      return {}


    // ------------ default state ------------
    default:
      return state;
  }
}

const evaluate = ({ curOperand, prevOperand, operation }) => {
  const prev = parseFloat(prevOperand);
  const cur = parseFloat(curOperand);

  if (isNaN(prev) || isNaN(cur)) return ""

  let computation = "";
  switch (operation) {
    case "+":
      computation = prev + cur
      break
    case "-":
      computation = prev - cur
      break
    case "*":
      computation = prev * cur
      break
    case "÷":
      computation = prev / cur
      break
  }
  return computation.toString()
}

function App() {
  // state as current/previous/operation
  const [{ curOperand, prevOperand, operation }, dispatch] = useReducer(reducer, {})

  return (
    <div className="calculator-grid">

      <div className="output">
        <div className="prev-operand">{prevOperand} {operation}</div>
        <div className="cur-operand">{curOperand}</div>
      </div>

      <button className="span-two" onClick={() => dispatch({ type: ACTION.CLEAR })}>AC</button>
      <button>DEL</button>
      <OperationButton dispatch={dispatch} operation="÷" />
      <DigitButton dispatch={dispatch} digit="7" />
      <DigitButton dispatch={dispatch} digit="8" />
      <DigitButton dispatch={dispatch} digit="9" />
      <OperationButton dispatch={dispatch} operation="*" />
      <DigitButton dispatch={dispatch} digit="4" />
      <DigitButton dispatch={dispatch} digit="5" />
      <DigitButton dispatch={dispatch} digit="6" />
      <OperationButton dispatch={dispatch} operation="+" />
      <DigitButton dispatch={dispatch} digit="1" />
      <DigitButton dispatch={dispatch} digit="2" />
      <DigitButton dispatch={dispatch} digit="3" />
      <OperationButton dispatch={dispatch} operation="-" />
      <DigitButton dispatch={dispatch} digit="." />
      <DigitButton dispatch={dispatch} digit="0" />
      <button className="span-two">=</button>

    </div >
  );
}

export default App;
