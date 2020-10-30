import React from 'react';

import classes from './EventControls.module.css';
import EventButton from './EventButton/EventButton';
import food from '../../assets/dog-bowl-color.png';
import treat from '../../assets/bone-color.png';
import walk from '../../assets/walking-the-dog-color.png';
import pee from '../../assets/fire-hydrant-color.png';
import poop from '../../assets/poop-color.png';

const eventControls = (props) => {

    const controls = [
        { label: 'Food', type: 'food', image: food, clicked: () => props.foodEventAdded() },
        { label: 'Treat', type: 'treat', image: treat, clicked: () => props.treatEventAdded() },
        { label: 'Walk', type: 'walk', image: walk, clicked: () => props.walkEventAdded() },
        { label: 'Pee', type: 'pee', image: pee, clicked: () => props.peeEventAdded() },
        { label: 'Poop', type: 'poop', image: poop, clicked: () => props.poopEventAdded() },
    ];

    return (
        <React.Fragment>
            <div className={classes.EventControls}>
            {controls.map(ctrl => (
                <EventButton
                    src={ctrl.image}
                    alt={ctrl.label}
                    clicked={ctrl.clicked}
                    key={ctrl.type}
                />
            ))}
            </div>
        </React.Fragment>
    );
};

export default eventControls;
