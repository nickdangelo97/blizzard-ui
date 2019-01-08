import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


const logincard = (props) => {
  const styles = {
    card: {
      display: 'flex',
      justifyContent: 'center',
      height: props.height,
      width: props.width
    },
    cardContent: {
      width: '80%'
    },
  };
  
  console.log(props.width, props.height)

  return (
      <Card style={styles.card} raised>
        <CardContent style={styles.cardContent}>
        {props.children}
        </CardContent>  
      </Card>

  );
}

export default logincard;
