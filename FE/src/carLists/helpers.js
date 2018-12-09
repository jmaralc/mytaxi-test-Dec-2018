export const computeConfort = (interior,exterior)=>{
    if(interior==="GOOD" && exterior==="GOOD")
    {
        return 4
    }
    else if(interior==="GOOD" && exterior==="UNACCEPTABLE")
    {
        return 3
    }
    else if(interior==="UNACCEPTABLE" && exterior==="GOOD")
    {
        return 2
    }
    else if(interior==="UNACCEPTABLE" && exterior==="UNACCEPTABLE")
    {
        return 1
    }
    else{
        return 0
    }

}