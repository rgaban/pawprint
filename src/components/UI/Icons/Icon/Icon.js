import React from 'react';

import { Icon } from 'react-icons-kit';
import classes from './Icon.module.css';

const icon = (props) =>
    <Icon
        icon={props.icon}
        size={24}
        onClick={props.clicked}
        className={classes.Icon}
    />

export default icon;
