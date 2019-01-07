import React from 'react';
import PropTypes from 'prop-types';
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
        marginLeft: '10px',
        alignSelf: "center"
    },
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
                    <Typography component="h5" variant="h5">
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

MediaControlCard.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MediaControlCard);