import React from 'react';

import classes from './EventButton.module.css';

const eventButton = (props) => (
    <div className={classes.EventButton}>
        <button>
            <img src={props.src} alt={props.alt} onClick={props.clicked} />
        </button>
    </div>
);

export default eventButton;
