import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useHistory } from 'react-router-dom';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const NavigationItems = (props) => {
    const [error, setError] = useState('');
    const {currentUser, logout} = useAuth();
    const history = useHistory();

    const logoutHandler = async () => {
        setError('');
        try {
            await logout()
                .then(history.push('/login'));
        } catch {
            setError('Failed to log out');
        };
    };

    return (
    <ul className={classes.NavigationItems}>
        {currentUser ? <NavigationItem link="/events">Events History</NavigationItem> : null}
        {currentUser ? <NavigationItem exact link="/">Add Event</NavigationItem> : null}
        {!currentUser
            ? null
            : <NavigationItem link="/login" clicked={logoutHandler}>Log Out</NavigationItem>}
    </ul>
    )
};

export default NavigationItems;
