import React, { Component } from 'react'
import Toolbar from '../../components/Navigation/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import UserDrawer from '../../components/Navigation/Drawer/UserDrawer';

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