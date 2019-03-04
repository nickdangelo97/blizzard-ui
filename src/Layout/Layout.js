import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';

import Toolbar from './Toolbar/Toolbar';
import UserDrawer from './Drawer/UserDrawer';

const styles = {
    main: {
        marginTop: 105,
        width: "100%",
        height: "calc(100vh - 125px)"
    }
}

class Layout extends Component {
    state = {
        open: false
    }

    clicked = (event) => {
        this.setState({ open: !this.state.open })
    }

    
    render() {
        const { classes } = this.props

        return (
            <>
                <Toolbar clicked={this.clicked} />
                <UserDrawer
                    open={this.state.open}
                    closed={this.clicked}
                />
                <main className={classes.main}>
                    {this.props.children}
                </main>
            </>
        );
    }
}

export default withStyles(styles)(Layout)