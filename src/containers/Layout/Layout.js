import React from 'react'
import Toolbar from '../../components/Navigation/Toolbar';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    main: {
        marginTop : 100
    }

}
const Layout = (props) => {
    const { classes } = props

    return (
        <>
            <Toolbar />
            <main className={classes.main}>
                {props.children}
            </main>
        </>
    );
}
export default withStyles(styles)(Layout)