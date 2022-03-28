# calculator
### default
- remove all unnecessary file in src folder
- only keep App.js and index.js as default
### create html layout for calculator
1. set entire calculator as grid
2. 2 sections 1 for display 1 for button
### css to format the display and button
1. reset the whole and set border-box
2. setup the background-image
3. set up grid for the calculator
4. button style including hover and focus
5. span two of button
6. update the display css including prev and cur
### calculator functionality
- useReduce state to handle input and math
- curOperand, prevOperand, operation as state and default of empty object
- reducer functions takes state and action but we break into type and payload
- setup global action to easy access - addDigits/operation/clear/delDigit/Eval
- start to build reducer function
  - switch for different case
  - add digits and return current state with curOperand digits click in
  - build digit button component to take
  - dispatch and the digit from parent
  - prevent edge case 1. the period only appear once / 2. the zero cant be multiple in front

- the action clear
  - reset the state to empty
  - onClick only need to pass in ACTION and no payload

- action of calculate +-*/
  - no number in the state we prevent the operation to "add" in
  - if have current number
    - spread out the state and update
      - 1. operation
      - 2. current becomes the previous
      - 3. clear out the current state
  - if we have both prev and current
    - it's the default return for calculate
    - spread out the state and update
      - 1. previous number
        - the previous number will update based on the calculation function - evaluate and it takes current/previous/operation
        - first we convert the current and previous to number
        - check either are entire number
        - then we pass the operation to each cause to match
            ```js
            switch (operation) {
                case "+":
                    computation = prev + cur
                    break
                ...
                ...
            }
            ```
        - return the computed number and update previous number
      - 2. update payload operation
      - 3. current will clear out
    - if current is empty and we click multiple times of operation will update to latest click
    - also add another attribute "overWrite" as true
      - means it's ready for next calculation
- update the add digit after the number computed
  - check the overWrite if true
  - we will update the current number to the clicked one
  - overWrite to false;

- delete digits when we click the wrong number
  - first if the number computed we can clear entire current operand
  - if no current we can return state
  - if only 1 current number we can set the current to null
  - the default if there current numbers
    - we will slice the last digit we click as slice(0, - 1)

- last we update the format of digits
  - bring in Intl.NumberFormat("en-us", {maxFractionDigits: 0})
  - create format function with input operand
  - if no operand we do nothing
  - then we split it into integer and decimal
  - if no decimal we return the formatted operand
  - if decimal we return formatted operand with the decimal