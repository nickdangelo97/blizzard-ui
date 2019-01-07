import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';




const UserCard = (props) => {

    const styles = {
        card: {
            display: 'flex',
            margin: '25px',
            height: props.height,
            width: props.width
          },
          cardContent: {
            width: '100%'
          },
    }

    return (
            <Card style={styles.card} raised>
                <CardContent style={styles.cardContent}>
                    {props.children}
                </CardContent>
            </Card>
    );
}
export default UserCard;