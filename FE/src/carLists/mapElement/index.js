import React from 'react';
import { withStyles } from '@material-ui/core/styles';


import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import * as helpers from './helpers'
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

const ICON = "M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"
                
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
                path: ICON,
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