import React from 'react'
import Toolbar from '../../components/Navigation/Toolbar';

const Layout = (props) => {
    const main_style = {
        marginTop : '72px'
    }

    return (
        <>
            <Toolbar />
            <main style={main_style}>
                {props.children}
            </main>
        </>
    );
}
export default Layout;