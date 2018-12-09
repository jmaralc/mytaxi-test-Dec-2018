import * as math from 'mathjs'

export const getAvgCenter = (data) =>{
    let avgLongitude= data.map(element=>{
        return element.longitude
    })
    let avgLatitude = data.map(element=>{
        return element.latitude
    })
    
    return {
         lat: Number(math.mean(avgLatitude)),
         lng: Number(math.mean(avgLongitude)),
    }
}