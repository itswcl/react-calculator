import React from 'react'
// bring in the ACTION from parent
import { ACTION } from './App'

// bring in the dispatch and digit
const DigitButton = ({ dispatch, digit }) => {
    return (
        <button
            // when click the digit we pass the type and payload
            // type as ADD_DIGIT and payload as the number pass in from parent
            onClick={() => dispatch({
                type: ACTION.ADD_DIGIT,
                payload: { digit },
            })}>
            {digit}
        </button>
    )
}

export default DigitButton