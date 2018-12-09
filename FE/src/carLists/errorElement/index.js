import React from 'react'
import { withStyles } from '@material-ui/core/styles';


import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    mainDiv: {
        display:'flex',
        direction: 'column',
        justify:'flex-start'

    },
    button: {
        margin: theme.spacing.unit,
      },
      input: {
        display: 'none',
    },
    card: {
        minWidth: 275,
      }
})

function ErrorElement(props) {
    const { classes,error } = props;
    return(
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
        <Typography component="p">
            {error.stack}
        </Typography>
        </CardContent>
        </Card>
    )
}

export default withStyles(styles)(ErrorElement);