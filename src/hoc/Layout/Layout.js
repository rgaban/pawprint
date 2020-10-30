import React, { useState } from 'react';

import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = (props) => {
    const [sideDrawer, setSideDrawer] = useState(false);

    const sideDrawerClosedHandler = () => {
        setSideDrawer(false);
    };

    const sideDrawerToggleHandler = () => {
        setSideDrawer(!sideDrawer);
    }

    return (
        <React.Fragment>
            <Toolbar drawerToggleClicked={sideDrawerToggleHandler} />
            <SideDrawer
                open={sideDrawer}
                closed={sideDrawerClosedHandler}
            />
            <main className={classes.Content}>
                {props.children}
            </main>
        </React.Fragment>
    )
}

export default Layout;
