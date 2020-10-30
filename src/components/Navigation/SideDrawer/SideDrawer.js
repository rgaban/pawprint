import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './SideDrawer.module.css';

const sideDrawer = (props) => {
    let listClasses = [classes.SideDrawer, classes.Close];
    if(props.open) {
        listClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <React.Fragment>
        <Backdrop show={props.open} clicked={props.closed} />
            <div className={listClasses.join(' ')} onClick={props.closed}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </React.Fragment>
    );
};

export default sideDrawer;
