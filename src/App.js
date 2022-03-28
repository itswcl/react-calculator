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
      // on add digit we want to check if the number is ready to over right
      // overWrite = true
      if (state.overWrite) {
        return {
          // spread out entire state
          ...state,
          // update the current number to the digit we clicked
          curOperand: payload.digit,
          // turn overWrite to false because it's calculating
          overWrite: false,
        }
      }
      // 2 edge case
      // if current is 0 and we cant add another 0;
      if (payload.digit === "0" && state.curOperand === "0") return state;
      // if current not entered and we click the period it should does nothing
      if (payload.digit === "." && !state.curOperand) return state;
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

      // handle if we click multiple times of sign to update the operation
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

    // ------------ handle the equal sign of evaluation ---------------------
    case ACTION.EVALUATE:
      if (state.curOperand == null || state.prevOperand == null || state.operation == null) return state;
      return {
        ...state,
        prevOperand: null,
        curOperand: evaluate(state),
        operation: null,
        // adding the overWrite to true, to show that the number is computed and ready for next turn
        // and back to add digits (first case)
        overWrite: true,
      }

    // ------------ delete the digits if we click the wrong number --------------
    case ACTION.DEL_DIGIT:
      // if it's calculated we act delete like clear
      if (state.overWrite) {
        return {
          ...state,
          overWrite: false,
          curOperand: null,
        };
      }

      if (state.curOperand == null) return state;
      if (state.curOperand.length === 1) {
        return {
          ...state,
          curOperand: null,
        }
      }

      return {
        ...state,
        curOperand: state.curOperand.slice(0, -1)
      }

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

const INTEGER_FORMATE = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})

const formatOperand = (operand) => {
  if (!operand) return;
  const [integer, decimal] = operand.split(".");
  if (!decimal) return INTEGER_FORMATE.format(integer);
  return `${INTEGER_FORMATE.format(integer)}.${decimal}`
}

function App() {
  // state as current/previous/operation
  const [{ curOperand, prevOperand, operation }, dispatch] = useReducer(reducer, {})

  return (
    <div className="calculator-grid">

      <div className="output">
        <div className="prev-operand">{formatOperand(prevOperand)} {operation}</div>
        <div className="cur-operand">{formatOperand(curOperand)}</div>
      </div>

      <button className="span-two" onClick={() => dispatch({ type: ACTION.CLEAR })}>AC</button>
      <button onClick={() => dispatch({ type: ACTION.DEL_DIGIT })}>DEL</button>
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
      <button className="span-two" onClick={() => dispatch({ type: ACTION.EVALUATE })}>=</button>

    </div >
  );
}

export default App;
