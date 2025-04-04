import * as actions from "./ActionTypes";
export const reducer = (state, action) => {
  switch (action.type) {
    case actions.ADD_MOVIE_TO_FAVOURITES:
      return {
        ...state,
        favourites: [action.payload, ...state.favourites],
      };
    case actions.REMOVE_MOVIE_FROM_FAVOURITES:
      return {
        ...state,
        favourites: state.favourites.filter(
          (movie) => movie !== action.payload
        ),
      };
    default:
      return state;
  }
};
