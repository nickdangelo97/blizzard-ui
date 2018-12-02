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
  title: {
    fontSize: 35,
  },
  pos: {
    marginBottom: 12,
  },
};

const logincard = (props) => {
  const { classes } = props;

  return (
    <div style={{width: '30%'}}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
        {props.children}
        </CardContent>  
      </Card>

    </div>

  );
}

export default withStyles(styles)(logincard);
