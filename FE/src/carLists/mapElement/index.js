import React from 'react';
import { withStyles } from '@material-ui/core/styles';


import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import * as helpers from './helpers'
import {icon_path} from '../../constants/maps'
import TabularElement from '../tabElement'

const styles = theme => ({
    mapCard: {
        margin:10,
        minWidth: 275,
      },
    mapDiv: {
        width: "100%",
        height: 500,
        display:'block',
        justify:'center'

    },
})


class MapElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleMarkers:[],
            highlightedMarkers:[],
            map: null,
            center: helpers.getAvgCenter(props.data),
            data: props.data
          };
        this.handleSelectItems = this.handleSelectItems.bind(this)
    }

    componentDidMount() {
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: this.state.center,
        zoom: 10
      });
      let visibleMarkers = this.state.data.map(element=>{ 
        return new window.google.maps.Marker({
            position: {lat:element.latitude,lng:element.longitude},
            map: map,
            title: `${element.id}`,
            icon: {
                path: icon_path,
                scale: 1,
                strokeWeight: 0.2,
                strokeColor: element.service==="mytaxi"?'#FDC300':'#00a0e1',
                strokeOpacity: (element.confort*2)/10,
                fillColor: element.service==="mytaxi"?'#FDC300':'#00a0e1',
                fillOpacity: (element.confort*2)/10,
            },
          })
        })
      this.setState({map,visibleMarkers})
    }
  

    handleSelectItems=(selectedItems)=>{
            selectedItems.map(selectedElement=>{
                this.state.visibleMarkers.map(marker=>{
                    if(marker.title===String(selectedElement)){
                        let icon = marker.getIcon()
                        icon.fillColor="#c62828"
                        marker.setZIndex(2000)
                        marker.setIcon(icon)
                    }
                    else{
                        let type = this.state.data.filter(element=>String(element.id)===marker.title )
                        
                        let icon = marker.getIcon()
                        icon.fillColor=type[0].service==="mytaxi"?'#FDC300':'#00a0e1'
                        marker.setZIndex(2)
                        marker.setIcon(icon)
                    }
                
                })
            })    
    }

    render() {
        const{classes} = this.props
        const{data} = this.state

      return (
        <div>
            <Card className={classes.mapCard}>
            <CardContent>
                <div className={classes.mapDiv} id="map" />
            </CardContent>
            </Card>
            <TabularElement
            type={"both"}
            data = {data}
            onSelectItems={this.handleSelectItems}
            />
        </div>

      );
    }
  }
  

export default withStyles(styles)(MapElement);