
const parse_mytaxi = (nonParsedData)=>{
    let parsedData = nonParsedData.map(element=>{
        return{
            id: element.id,
            latitude: element.coordinate.latitude,
            longitude: element.coordinate.longitude,
            state: element.state,
            type: element.type
        }
    })
    
    return parsedData
}

const parse_car2go = (nonParsedData)=>{
    let parsedData = nonParsedData.map(element=>{
        return{
            id: element.id,
            name: element.name,
            vin: element.vin,
            latitude: element.coordinates[1],
            longitude: element.coordinates[0],
            fuel: element.fuel,
            interior: element.interior,
            exterior: element.exterior,
            engineType: element.engineType,
            address: element.address,
        }
    })
    return parsedData
}

const parse_combined = (nonParsedData)=>{
    let parsedData = nonParsedData.map(element=>{
        return{
            id: element.id,
            latitude: element.latitude,
            longitude: element.longitude,
            service: element.service,
            confort: element.confort,
            fuel: element.fuel,
        }
    })
    return parsedData
}


export const createData = (carListType,data) => {
    switch(carListType){
        case "mytaxi":
            return parse_mytaxi(data)
        case "car2go":
            return parse_car2go(data)
        default:
            return parse_combined(data)
    }
}

export const generateRows = (carListType)=>{
    switch(carListType){
        case "mytaxi":
            return [
                {id: "id", numeric: false, disablePadding: true, label: "Car ID", chirp:false},
                {id: "latitude", numeric: true, disablePadding: false, label: "Latitude", chirp:false},
                {id: "longitude", numeric: true, disablePadding: false, label: "Longitude", chirp:false},
                {id: "state", numeric: false, disablePadding: false, label: "State", chirp:true},
                {id: "type", numeric: false, disablePadding: false, label: "Type", chirp:false}
            ];
            
        case "car2go":
            return [
                {id: "id", numeric: false, disablePadding: true, label: "Car ID", chirp:false},
                {id: "name", numeric: false, disablePadding: false, label: "Name", chirp:false},
                {id: "vin", numeric: false, disablePadding: false, label: "VIN", chirp:false},
                {id: "latitude", numeric: true, disablePadding: false, label: "Latitude", chirp:false},
                {id: "longitude", numeric: true, disablePadding: false, label: "Longitude", chirp:false},
                {id: "fuel", numeric: true, disablePadding: false, label: "Fuel", chirp:false},
                {id: "interior", numeric: false, disablePadding: false, label: "Int. State", chirp:true},
                {id: "exterior", numeric: false, disablePadding: false, label: "Ext. State", chirp:true},
                {id: "engineType", numeric: false, disablePadding: false, label: "Engine", chirp:false},
                {id: "address", numeric: false, disablePadding: false, label: "address", chirp:false}
            ];
        default:
            return [
                {id: "id", numeric: false, disablePadding: true, label: "Car ID", chirp:false},
                {id: "latitude", numeric: true, disablePadding: false, label: "Latitude", chirp:false},
                {id: "longitude", numeric: true, disablePadding: false, label: "Longitude", chirp:false},
                {id: "service", numeric: false, disablePadding: false, label: "Service", chirp:true},
                {id: "confort", numeric: false, disablePadding: false, label: "Confort", chirp:false},
                {id: "fuel", numeric: false, disablePadding: false, label: "Fuel", chirp:false}
            ];
    }
}

export const stableSort = (array, cmp) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

const desc = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

export const getSorting = (order, orderBy) =>
        order === "desc"
          ? (a, b) => desc(a, b, orderBy)
          : (a, b) => -desc(a, b, orderBy);

export const parseConfort = (confort)=>{
    switch(confort){
        case 5:
            return "PREMIUM"
        case 4:
            return "GOOD"
        case 3:
            return "MEDIUM"
        case 2:
            return "POOR"
        case 1:
            return "UNACEPTABLE"
        default:
            return "UNKNOWN"
    }

}

const truncate = (n) => n > 0 ? Math.floor(n) : Math.ceil(n)

export const getDMS = (dd, longOrLat) => {
    let hemisphere = /^[WE]|(?:lon)/i.test(longOrLat)
    ? dd < 0
      ? "W"
      : "E"
    : dd < 0
      ? "S"
      : "N";
    
    const absDD = Math.abs(dd);
    const degrees = truncate(absDD);
    const minutes = truncate((absDD - degrees) * 60);
    const seconds = ((absDD - degrees - minutes / 60) * Math.pow(60, 2)).toFixed(2);
    
    let dmsArray = [degrees, minutes, seconds, hemisphere];
    return `${dmsArray[0]}°${dmsArray[1]}'${dmsArray[2]}" ${dmsArray[3]}`;
}

