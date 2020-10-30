import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/events">Events History</NavigationItem>
        <NavigationItem exact link="/">Add Event</NavigationItem>
    </ul>
);

export default navigationItems;
