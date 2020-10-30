import React from 'react';

import classes from './Event.module.css';
import Icon from '../UI/Icons/Icon/Icon';
import { edit } from 'react-icons-kit/entypo/edit';
import { cross } from 'react-icons-kit/entypo/cross';


const event = (props) => {

    return (
        <React.Fragment>
            <div className={classes.Event}>
                <div className={classes.ActionImage}>
                    <img
                    src={props.actionImage}
                    alt={'action'}
                />
                </div>
                <div className={classes.EventDetails}>
                    <p className={classes.EventTitle}>{props.action}</p>
                    <p className={classes.EventDate}>{props.date}</p>
                </div>
                <div className={classes.ActionIcons}>
                    <Icon
                        icon={edit}
                        key={'edit'}
                        clicked={() => props.editEvent()}
                    />
                    <Icon
                        icon={cross}
                        key={'delete'}
                        clicked={() => props.deleteEvent()}
                    />
                </div>
            </div>
            <hr />
        </React.Fragment>
    );
};

export default event;
