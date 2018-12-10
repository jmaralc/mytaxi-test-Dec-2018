import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
  mainDiv: {
    display: 'flex',
    direction: 'column',
    justify: 'flex-start',
  },
  card: {
    minWidth: 275,
  },
};

function ErrorElement(props) {
  const { classes, error } = props;
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          ERROR
        </Typography>
        <Typography variant="h5" component="h2">
          {error.message}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {error.name}
        </Typography>
        <Typography component="p">{error.stack}</Typography>
      </CardContent>
    </Card>
  );
}

ErrorElement.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  error: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withStyles(styles)(ErrorElement);
