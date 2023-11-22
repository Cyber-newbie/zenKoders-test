import {
  CLEAR_HEADLINES,
  CLEAR_SEARCH_NEWS,
  GET_HEADLINES,
  GET_NEWS,
  SEARCH_NEWS,
} from "../type";

const initalState = {
  articles: [],
  topHeadlines: [],
};

export default function (state = initalState, action) {
  switch (action.type) {
    case GET_NEWS:
      return {
        ...state,
        articles: action.payload.articles,
      };
    case GET_HEADLINES:
      return {
        ...state,
        topHeadlines: action.payload,
      };
    case SEARCH_NEWS:
      return {
        ...state,
        articles: action.payload,
      };
    case CLEAR_HEADLINES:
      return {
        ...state,
      };
    case CLEAR_SEARCH_NEWS:
      return {
        ...state,
      };
    default:
      return state;
  }
}
