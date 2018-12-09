import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import {connect} from "react-redux";

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import TabularElement from './tabElement'
import MapElement from './mapElement'
import LoadingElement from './loadingElement'
import ErrorElement from './errorElement'
import * as actions from "./actions";

const styles = theme => ({
})

const sections =["mytaxi","car2go", "combined","map"]

class CarLists extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = {
            value: 0,
            type: sections[0]
        };
        this.handleChange = this.handleChange.bind(this)
    }

    componentWillMount() {
      this.props.dispatch(actions.carList(this.state.type));
    }

    handleChange(event){
        let type = event.target.innerText.toLowerCase()
        let value = sections.indexOf(type)
        this.setState({value,type });
        this.props.dispatch(actions.carList(type));
    };

    handleSelectItems = ()=>{
        console.log("Nothing to do")
    }
    render(){
        const { classes,isFetching,data,error } = this.props;
        const { value, type } = this.state;
        
        const toRender = ()=>{
            
            if (isFetching || (!data && !error)){
                return <LoadingElement/>
            }
            else if (error){
                return (<ErrorElement 
                    classes={classes}
                    error={error}
                    />
                )
            }
            else
            {
                return type==="map"?<MapElement
                    type={type}
                    classes={classes}
                    data = {data}
                />:<TabularElement
                type={type}
                classes={classes}
                data = {data}
                onSelectItems={this.handleSelectItems}
                />

            }
        }
        return (
            <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value} onChange={this.handleChange}>
                    <Tab label="MyTaxi" />
                    <Tab label="Car2Go" />
                    <Tab label="Combined" />
                    <Tab label="Map" />
                </Tabs>
            </AppBar>
        {
            toRender()
        }
        </div>
        )
        
    }
}

const mapStateToProps = (state) => {
    return {
        isFetching: state.mainAppReducer.isFetching,
        data: state.mainAppReducer.data,
        error: state.mainAppReducer.error,
    }
  }

export default withStyles(styles)(connect(mapStateToProps)(CarLists));