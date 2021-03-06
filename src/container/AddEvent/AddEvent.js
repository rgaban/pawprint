import React, { useState } from 'react';

import EventControls from '../../components/EventControls/EventControls';
import EventSummary from '../../components/EventSummary/EventSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import errorHandler from '../../hoc/errorHandler/errorHandler'
import { convertISOToEpoch, getDateTime } from '../../utility/utility';
import { useAuth } from '../../context/AuthContext';

const AddEvent = (props) => {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState(getDateTime());
    const [eventComment, setEventComment] = useState('');
    const { currentUser } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [addingEvent, setAddingEvent] = useState(false);
    const [eventAdded, setEventAdded] = useState(false);

    const URL = `${process.env.REACT_APP_FIREBASE_DATABASE_URL}/events/${currentUser.uid}.json?auth=${currentUser.ya}`

    console.log(currentUser);

    const dateChangeHandler = (event) => {
        setEventDate(event.target.value);
    };

    const commentChangeHandler = (event) => {
        setEventComment(event.target.value);
    }

    const addEventHandler = (eventType) => {
        setEventAdded(false);
        setAddingEvent(true);
        setEventName(eventType);
        setEventDate(getDateTime());
    };

    const addEventCancelHandler = () => {
        setEventAdded(false);
        setAddingEvent(false);
    };

    const addEventContinueHandler = (event) => {
        event.preventDefault();
        // const eventList = fetchEvents(currentUser.uid);

        const eventData = {
            eventName: eventName,
            eventComment: eventComment,
            timestamp: convertISOToEpoch(eventDate),
            userId: currentUser.uid
        }

        console.log(eventData);

        fetch(URL, {
            method: 'POST',
            // mode: 'no-cors',
            // credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventData)
        })
        .then(response => {
            console.log(response);
            const result = response.json();
            setEventAdded(true);
            console.log(result);
        })
        .catch(error => {
            // setError(error);
            console.log(error);
        })
        .finally(() => {
            setIsLoading(false);
            // setEventAdded(false);
        });
    }

    let page = (
        <EventSummary
            addEventCancelled={addEventCancelHandler}
            eventName={eventName}
            dateDefaultValue={eventDate}
            submit={addEventContinueHandler}
            dateChanged={dateChangeHandler}
            commentChanged={commentChangeHandler}
        />
    );

    if (isLoading) {
        page = <Spinner />
    }

    if (eventAdded && !isLoading) {
        page = <div>Event Added to Logs!</div>;
    }

    return (
        <React.Fragment>
            <Modal show={addingEvent} modalClosed={addEventCancelHandler}>
                {page}
            </Modal>
            <EventControls
                foodEventAdded={() => addEventHandler('food')}
                treatEventAdded={() => addEventHandler('treat')}
                walkEventAdded={() => addEventHandler('walk')}
                peeEventAdded={() => addEventHandler('pee')}
                poopEventAdded={() => addEventHandler('poop')}
            />
        </React.Fragment>
    );
}

export default errorHandler(AddEvent);
