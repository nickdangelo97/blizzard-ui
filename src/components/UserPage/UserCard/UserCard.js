import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';


const styles = {
    card: {
        display: 'flex',
      },
      cardContent: {
        width: '100%'
      },
}

const UserCard = (props) => {
    const { classes } = props
    console.log(props.width)
    return (
        <div style={{ width: props.width, height: props.height }}>
            <Card className={classes.card} raised>
                <CardContent className={classes.cardContent}>
                    {props.children}
                </CardContent>
            </Card>

        </div>
    );
}
export default withStyles(styles)(UserCard);