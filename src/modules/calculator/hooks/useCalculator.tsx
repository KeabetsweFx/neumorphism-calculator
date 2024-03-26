import { useCallback, useReducer } from "react";

const INITIAL_STATE: State = {
  display: "0",
  firstOperand: null,
  operator: null,
  waitingForSecondOperand: false,
};

const calculatorReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "CLEAR":
      return INITIAL_STATE;
    case "SET_DISPLAY":
      return { ...state, display: action.payload };
    case "SET_FIRST_OPERAND":
      return { ...state, firstOperand: action.payload };
    case "SET_OPERATOR":
      return { ...state, operator: action.payload };
    case "SET_WAITING_FOR_SECOND_OPERAND":
      return { ...state, waitingForSecondOperand: action.payload };
    default:
      return state;
  }
};

export function useCalculator() {
  const [state, dispatch] = useReducer(calculatorReducer, INITIAL_STATE);

  const handleOnKeyPress = useCallback(
    (key: string) => {
      switch (key) {
        case "C":
          dispatch({ type: "CLEAR" });
          break;
        case "+/-":
          dispatch({
            type: "SET_DISPLAY",
            payload: (Number.parseFloat(state.display) * -1).toString(),
          });
          break;
        case "%":
          dispatch({
            type: "SET_DISPLAY",
            payload: (Number.parseFloat(state.display) / 100).toString(),
          });
          break;
        case ".":
          if (!state.display.includes(".")) {
            dispatch({ type: "SET_DISPLAY", payload: state.display + key });
            if (state.waitingForSecondOperand)
              dispatch({
                type: "SET_WAITING_FOR_SECOND_OPERAND",
                payload: false,
              });
          }
          break;
        case "=":
          if (state.operator && !state.waitingForSecondOperand) {
            const secondOperand = Number.parseFloat(state.display);
            let result = 0;
            switch (state.operator) {
              case "+":
                result = (state.firstOperand as number) + secondOperand;
                break;
              case "-":
                result = (state.firstOperand as number) - secondOperand;
                break;
              case "x":
                result = (state.firstOperand as number) * secondOperand;
                break;
              case "/":
                result = (state.firstOperand as number) / secondOperand;
                break;
              default:
                break;
            }
            dispatch({ type: "SET_DISPLAY", payload: result.toString() });
            dispatch({ type: "SET_FIRST_OPERAND", payload: null });
            dispatch({ type: "SET_OPERATOR", payload: null });
            dispatch({ type: "SET_WAITING_FOR_SECOND_OPERAND", payload: true });
          }
          break;
        default:
          if (!Number.isNaN(Number(key))) {
            if (state.display === "0" || state.waitingForSecondOperand) {
              dispatch({ type: "SET_DISPLAY", payload: key });
              dispatch({
                type: "SET_WAITING_FOR_SECOND_OPERAND",
                payload: false,
              });
            } else {
              dispatch({ type: "SET_DISPLAY", payload: state.display + key });
            }
          } else {
            if (state.operator !== null && !state.waitingForSecondOperand) {
              const result = calculate(Number.parseFloat(state.display));
              dispatch({ type: "SET_FIRST_OPERAND", payload: result });
              dispatch({ type: "SET_OPERATOR", payload: key });
              dispatch({
                type: "SET_WAITING_FOR_SECOND_OPERAND",
                payload: true,
              });
            } else {
              dispatch({
                type: "SET_FIRST_OPERAND",
                payload: Number.parseFloat(state.display),
              });
              dispatch({ type: "SET_OPERATOR", payload: key });
              dispatch({
                type: "SET_WAITING_FOR_SECOND_OPERAND",
                payload: true,
              });
            }
          }
          break;
      }
    },
    [state],
  );

  const calculate = useCallback(
    (secondOperand: number) => {
      const first = state.firstOperand;
      if (Number.isNaN(first) || Number.isNaN(secondOperand)) return null;

      switch (state.operator) {
        case "+":
          return (first as number) + secondOperand;
        case "-":
          return (first as number) - secondOperand;
        case "x":
          return (first as number) * secondOperand;
        case "/":
          return (first as number) / secondOperand;
        default:
          return null;
      }
    },
    [state],
  );

  return { display: state.display, handleOnKeyPress };
}

type State = {
  display: string;
  firstOperand: number | null;
  operator: string | null;
  waitingForSecondOperand: boolean;
};

type Action =
  | { type: "CLEAR" }
  | { type: "SET_DISPLAY"; payload: string }
  | { type: "SET_FIRST_OPERAND"; payload: number | null }
  | { type: "SET_OPERATOR"; payload: string | null }
  | { type: "SET_WAITING_FOR_SECOND_OPERAND"; payload: boolean };
