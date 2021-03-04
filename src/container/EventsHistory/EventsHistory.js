import React, { useEffect, useState } from 'react';

import classes from './EventsHistory.module.css';
import Event from '../../components/Event/Event';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';
import EditComment from '../../components/EditComment/EditComment';
import errorHandler from '../../hoc/errorHandler/errorHandler';
import { convertEpochToLocal, convertISOToEpoch, getDateTime } from '../../utility/utility';
import { useAuth } from '../../context/AuthContext';

import food from '../../assets/dog-bowl-color.png';
import treat from '../../assets/bone-color.png';
import walk from '../../assets/walking-the-dog-color.png';
import pee from '../../assets/fire-hydrant-color.png';
import poop from '../../assets/poop-color.png';

const actionsObj = {
    food: [food, 'Food'],
    treat: [treat, 'Treat'],
    walk: [walk, 'Walk'],
    pee: [pee, 'Pee'],
    poop: [poop, 'Poop']
}

const EventsHistory = () => {
    const [events, setEvents] = useState();
    const [eventId, setEventId] = useState('');
    const [eventName, setEventName] = useState('');
    const [eventComment, setEventComment] = useState('');
    const [eventTimestamp, setEventTimestamp] = useState(null);

    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [editingEvent, setEditingEvent] = useState(false);
    const [eventUpdated, setEventUpdated] = useState(false);
    const { currentUser } = useAuth();

    const authQueryParam = `.json?auth=${currentUser.ya}`;
    const fetchURL = `${process.env.REACT_APP_FIREBASE_DATABASE_URL}/events/${currentUser.uid}${authQueryParam}`;
    const updateURL = `${process.env.REACT_APP_FIREBASE_DATABASE_URL}/events/${currentUser.uid}/`;

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(fetchURL);
                const result = await res.json();
                setResponse(result);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [fetchURL, eventUpdated]);

    useEffect(() => {
        const fetchedEvents =  [];
        for (let key in response) {
            fetchedEvents.push({
                ...response[key],
                id: key
            });
        };
        setEvents(fetchedEvents);
        setIsLoading(false);

        if (fetchedEvents) {
            const sortedEvents = fetchedEvents.sort((a, b) => {
                return b.timestamp - a.timestamp;
            });
            setEvents(sortedEvents);
        }
    }, [response]);

    useEffect(() => {
        // wait 500ms to set event
        const timeOut = setTimeout(() => null, 500);
        return () => clearTimeout(timeOut);
    }, [eventComment]);

    const editEventHandler = (id) => {
        setEventUpdated(false);
        setEditingEvent(true);
        fetch(`${updateURL}${id}${authQueryParam}`, {
            method: 'GET',
            header: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(result => {
            console.log(result);
            setEventId(id);
            setEventName(result.eventName);
            setEventComment(result.eventComment);
            setEventTimestamp(getDateTime(result.timestamp));
        })
        .catch(error => {
            console.log(error);
        })
    };

    const deleteEventHandler = (id) => {
        fetch(`${updateURL}${id}${authQueryParam}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(result => {
            setEventUpdated(true);
            setIsLoading(true);
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            setEventUpdated(false);
            setIsLoading(false);
        });
    };

    const editEventSaveHandler = () => {
        fetch(`${updateURL}${eventId}${authQueryParam}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                eventName: eventName,
                eventComment: eventComment,
                timestamp: convertISOToEpoch(eventTimestamp)
            })
        })
        .then(response => response.json())
        .then(result => {
            // getEvents();
            setEventUpdated(true);
            console.log(result);
        })
        .catch(error => {
            setError(error);
        })
        .finally(() => {
            setEditingEvent(false);
            setEventUpdated(false);
        });

    };

    const commentChangeHandler = (event) => {
        setEventComment(event.target.value);
    };

    const dateChangeHandler = (event) => {
        setEventTimestamp(event.target.value);
    };

    const cancelEditEventHandler = () => {
        setEditingEvent(false);
    };

    let page = <EditComment
        eventName={eventName}
        commentValue={eventComment}
        dateValue={eventTimestamp || ''}
        dateChanged={dateChangeHandler}
        commentChanged={commentChangeHandler}
        editEventCancelled={cancelEditEventHandler}
        editEventSaved={editEventSaveHandler}
    />;

    if (isLoading) {
        page = <Spinner />
    };

    if (eventUpdated) {
        page = <div>Event Updated!</div>
    }

    let eventsList = <Spinner />;
    if (!isLoading && events) {
        eventsList = events.map(event => (
            <Event
                key={event.id}
                actionImage={actionsObj[event.eventName][0]}
                action={actionsObj[event.eventName][1]}
                date={convertEpochToLocal(event.timestamp)}
                deleteEvent={() => deleteEventHandler(event.id)}
                editEvent={() => editEventHandler(event.id)}
            />
        ));
    }
    if (!events) {
        eventsList = <div>No events logged...</div>
    }

    return (
        <div className={classes.EventsHistory}>
            <Modal show={editingEvent} modalClosed={cancelEditEventHandler}>
                {page}
            </Modal>
            {eventsList}
        </div>
    );
};

export default errorHandler(EventsHistory);
