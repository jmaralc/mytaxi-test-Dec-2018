import {
  CARS_LIST, CARS_LIST_REQUEST, CARS_LIST_SUCCESS, CARS_LIST_FAILURE,
} from './actions';

const initialState = {
  isFetching: false,
  data: null,
  error: false,
  classes: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CARS_LIST:
      return { ...state };
    case CARS_LIST_REQUEST:
      return { ...state, isFetching: action.isFetching };
    case CARS_LIST_SUCCESS:
      if (action.carList === 'mytaxi') {
        return {
          ...state,
          isFetching: action.isFetching,
          data: action.payload.poiList,
          error: false,
        };
      }
      if (action.carList === 'car2go') {
        return {
          ...state,
          isFetching: action.isFetching,
          data: action.payload.placemarks,
          error: false,
        };
      }
      return {
        ...state,
        isFetching: action.isFetching,
        data: action.payload,
        error: false,
      };

    case CARS_LIST_FAILURE:
      return { ...state, isFetching: false, error: action.error };
    default:
      return state;
  }
};
