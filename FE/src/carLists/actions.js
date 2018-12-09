import {CARS_LIST_REQUEST,CARS_LIST_FAILURE,CARS_LIST_SUCCESS} from '../constants/actions'
import {SERVER} from '../constants/hosts'
import * as helpers from './helpers'

const  carListRequest = () => {
    return {
        type: CARS_LIST_REQUEST,
        isFetching: true
    } 
}


const  carListFailure = (error) => {
    return {
        type: CARS_LIST_FAILURE,
        error
    } 
}

const  carListSuccess = (carList,payload) => {
    window.localStorage.setItem("loggedIn", true)
    return {
        type: CARS_LIST_SUCCESS,
        carList,
        isFetching: false,
        payload
    } 
}

export const  carList = (carList)=> dispatch => {
        dispatch(carListRequest())
        if(carList==="combined" || carList==="map")
        {
            let mytaxi=[]
            let car2go=[]
            return fetch(`${SERVER}/mytaxi/vehicles`)
            .then(response=>response.json())
            .then(payload=>mytaxi=payload.poiList)
            .then(()=>fetch(`${SERVER}/car2go/vehicles`))
            .then(response=>response.json())
            .then(payload=>car2go=payload.placemarks)
            .then(()=>{ 
                let payload = mytaxi.map(element=>{
                    console.log("mytaxi")
                    return{
                        id: element.id,
                        longitude: element.coordinate.longitude,
                        latitude: element.coordinate.latitude,
                        service: "mytaxi",
                        confort: 5,
                        fuel: null
                    }
                })
                payload = payload.concat(
                    car2go.map(element=>{
                        console.log("car2go")
                        return{
                            id: element.id,
                            longitude: element.coordinates[0],
                            latitude: element.coordinates[1],
                            service: "car2go",
                            confort: helpers.computeConfort(element.interior,element.exterior),
                            fuel: element.fuel
                        }
                    })
                )
                return payload
            })
            .then(payload=>{
                dispatch(carListSuccess(carList,payload))
            })
            .catch(err => {
                dispatch(carListFailure(err))
                console.error("Failure: ",err)
            })

        }
        else
        {
            return fetch(`${SERVER}/${carList}/vehicles`)
            .then(response=>response.json())
            .then(payload=> {
                dispatch(carListSuccess(carList,payload))
            })
            .catch(err => {
                dispatch(carListFailure(err))
                console.error("Failure: ",err)
            })
        }

}