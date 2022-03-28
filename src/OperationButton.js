import React from 'react'
// bring in the ACTION from parent
import { ACTION } from './App'

// bring in the dispatch and digit
const OperationButton = ({ dispatch, operation }) => {
    return (
        <button
            // when click the digit we pass the type and payload
            // type as ADD_DIGIT and payload as the number pass in from parent
            onClick={() => dispatch({
                type: ACTION.CHOOSE_OPERATION,
                payload: { operation },
            })}>
            {operation}
        </button>
    )
}

export default OperationButton