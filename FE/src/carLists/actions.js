import SERVER from '../config';
import { computeConfort } from './helpers';

export const CARS_LIST = 'CARS_LIST';
export const CARS_LIST_REQUEST = 'CARS_LIST_REQUEST';
export const CARS_LIST_FAILURE = 'CARS_LIST_FAILURE';
export const CARS_LIST_SUCCESS = 'CARS_LIST_SUCCESS';

const carListRequest = () => ({
  type: CARS_LIST_REQUEST,
  isFetching: true,
});

const carListFailure = error => ({
  type: CARS_LIST_FAILURE,
  error,
});

const carListSuccess = (carList, payload) => {
  window.localStorage.setItem('loggedIn', true);
  return {
    type: CARS_LIST_SUCCESS,
    carList,
    isFetching: false,
    payload,
  };
};

export const carList = carListService => (dispatch) => {
  dispatch(carListRequest());
  if (carListService === 'combined' || carListService === 'map') {
    let mytaxi = [];
    let car2go = [];

    return fetch(`${SERVER}/mytaxi/vehicles`)
      .then(response => response.json())
      .then((payload) => {
        mytaxi = payload.poiList;
        return fetch(`${SERVER}/car2go/vehicles`);
      })
      .then(response => response.json())
      .then((payload) => {
        car2go = payload.placemarks;
        let mydata = mytaxi.map(element => ({
          id: element.id,
          longitude: element.coordinate.longitude,
          latitude: element.coordinate.latitude,
          service: 'mytaxi',
          confort: 5,
          fuel: null,
        }));
        mydata = mydata.concat(
          car2go.map(element => ({
            id: element.id,
            longitude: element.coordinates[0],
            latitude: element.coordinates[1],
            service: 'car2go',
            confort: computeConfort(element.interior, element.exterior),
            fuel: element.fuel,
          })),
        );
        return mydata;
      })
      .then((payload) => {
        dispatch(carListSuccess(carListService, payload));
      })
      .catch((err) => {
        dispatch(carListFailure(err));
      });
  }

  // For the cases in which carListService is mytaxi or car2go
  return fetch(`${SERVER}/${carListService}/vehicles`)
    .then(response => response.json())
    .then((payload) => {
      dispatch(carListSuccess(carListService, payload));
    })
    .catch((err) => {
      dispatch(carListFailure(err));
    });
};
