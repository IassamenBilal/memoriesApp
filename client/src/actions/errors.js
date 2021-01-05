import { CLEAR_ERRORS, GET_ERRORS } from "./types";
const returnErrors = (msg, status, id = null) => {
  return {
    type: GET_ERRORS,
    payload: {
      msg,
      status,
      id,
    },
  };
};

const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
export { returnErrors, clearErrors };
