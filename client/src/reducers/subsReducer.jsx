import { CLEAR_SUBSCRIBE, SUBSCRIBE } from "../type";
const initalState = {
  sessionURL: null,
  successURL: null,
  failedURL: null,
};

export default function (state = initalState, action) {
  switch (action.type) {
    case SUBSCRIBE:
      return {
        sessionURL: action.payload.sessionURL,
        successURL: action.payload.successURL,
        failedURL: action.payload.failedURL,
      };
    case CLEAR_SUBSCRIBE:
      return state;
    default:
      return state;
  }
}
