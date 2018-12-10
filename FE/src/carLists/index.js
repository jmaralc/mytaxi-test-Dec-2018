import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import TabularElement from './tabElement';
import MapElement from './mapElement';
import LoadingElement from './loadingElement';
import ErrorElement from './errorElement';
import * as actions from './actions';

const sections = ['mytaxi', 'car2go', 'combined', 'map'];

class CarLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      type: sections[0],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    const { type } = this.state;
    dispatch(actions.carList(type));
  }

  handleSelectItems = () => {};

  handleChange(event) {
    const { dispatch } = this.props;
    const type = event.target.innerText.toLowerCase();
    const value = sections.indexOf(type);
    this.setState({ value, type });
    dispatch(actions.carList(type));
  }

  render() {
    const {
      classes, isFetching, data, error,
    } = this.props;
    const { value, type } = this.state;

    const toRender = () => {
      if (isFetching || (!data && !error)) {
        return <LoadingElement />;
      }
      if (error) {
        return <ErrorElement classes={classes} error={error} />;
      }
      return type === 'map' ? (
        <MapElement type={type} classes={classes} data={data} />
      ) : (
        <TabularElement
          type={type}
          classes={classes}
          data={data}
          onSelectItems={this.handleSelectItems}
        />
      );
    };
    return (
      <div>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="MyTaxi" />
            <Tab label="Car2Go" />
            <Tab label="Combined" />
            <Tab label="Map" />
          </Tabs>
        </AppBar>
        {toRender()}
      </div>
    );
  }
}

CarLists.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
  isFetching: state.mainAppReducer.isFetching,
  data: state.mainAppReducer.data,
  error: state.mainAppReducer.error,
  classes: state.mainAppReducer.classes,
});

export default connect(mapStateToProps)(CarLists);
