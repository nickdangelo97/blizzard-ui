import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Logo from '../../../assets/fc.png'

const styles = theme => ({
    card: {
        display: 'flex',
        marginTop: "15px",
        width: "100%"
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '0 1 auto',

    },
    cover: {
        width: 151,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
    },
    playIcon: {
        height: 38,
        width: 38,
    },
    submitButton: {
        marginTop: '10px',
        marginRight: 10,
        alignSelf: "center",
        [theme.breakpoints.down(556)]: {
            fontSize: '0.650em',
        },
    },
    bodyText : {
        [theme.breakpoints.up(557)]: {
            fontSize: '1.300em',
        },
        [theme.breakpoints.down(556)]: {
            fontSize: '1.150em',
        },
    }
});

function MediaControlCard(props) {
    const { classes, theme } = props;

    return (
        <Card className={classes.card} raised>
            <CardMedia
                className={classes.cover}
                image={Logo}
                title="Live from space album cover"
            />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography className={classes.bodyText}>
                        Title
          </Typography>
                </CardContent>
                <div className={classes.controls}>
                    <Button className={classes.submitButton}
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={props.clicked}>
                        Click here to learn more
                    </Button>
                </div>
            </div>
        </Card>
    );
}

export default withStyles(styles, { withTheme: true })(MediaControlCard);