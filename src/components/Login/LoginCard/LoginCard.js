import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const styles = {
  card: {
    display: 'flex',
    justifyContent: 'center'
  },
  cardContent: {
    width: '80%'
  },
};

const logincard = (props) => {
  const { classes } = props;

  return (
    <div style={{width: props.width, height:props.height}}>
      <Card className={classes.card} raised>
        <CardContent className={classes.cardContent}>
        {props.children}
        </CardContent>  
      </Card>

    </div>

  );
}

export default withStyles(styles)(logincard);
