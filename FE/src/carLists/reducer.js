import {CARS_LIST,
    CARS_LIST_REQUEST,
    CARS_LIST_SUCCESS,
    CARS_LIST_FAILURE} from '../constants/actions'

const initialState = {
    isFetching: false,
    data: null,
    error: false
  }

  export default (state=initialState, action) =>{
    switch(action.type){
        case CARS_LIST:
            return {...state,
            }
        case CARS_LIST_REQUEST:
            return {...state,
                isFetching: action.isFetching
            }
        case CARS_LIST_SUCCESS:
            if(action.carList==="mytaxi")
            {
                return {...state,
                    isFetching: action.isFetching,
                    data: action.payload.poiList,
                    error:false
                }
            }
            else if(action.carList==="car2go"){
                return {...state,
                    isFetching: action.isFetching,
                    data: action.payload.placemarks,
                    error:false
                }
            }
            else{
                return {...state,
                    isFetching: action.isFetching,
                    data: action.payload,
                    error:false
                }
            }
        case CARS_LIST_FAILURE:
            return {...state,
                isFetching: false,
                error: action.error
            }
        default:
            return state
    }
}