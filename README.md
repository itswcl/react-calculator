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
