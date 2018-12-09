import React from 'react'
import { withStyles } from '@material-ui/core/styles';


import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    card: {
        margin:50,
        minWidth: 275,
      }
})

function NoMatch(props) {
    const { classes } = props;
    return(
        <Card className={classes.card}>
        <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
            ELEMENT NOT FOUND
        </Typography>
        <Typography variant="h5" component="h2">

        </Typography>
        <Typography className={classes.pos} color="textSecondary">

        </Typography>
        <Typography component="p">

        </Typography>
        </CardContent>
        </Card>
    )
}

export default withStyles(styles)(NoMatch);
