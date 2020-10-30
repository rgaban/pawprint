import React from 'react';

import pawPrintLogo from '../../assets/paw-print-logo.png';
import classes from './Logo.module.css';

const logo = (props) => (
    <div
        className={classes.Logo}
        style={{height: props.height}}
    >
        <img src={pawPrintLogo} alt="PawPrint"/>
    </div>
);

export default logo;
