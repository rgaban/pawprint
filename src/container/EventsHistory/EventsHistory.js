import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import axios from '../../axios-events';

import classes from './EventsHistory.module.css';
import Event from '../../components/Event/Event';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';
import EditComment from '../../components/EditComment/EditComment';
import errorHandler from '../../hoc/errorHandler/errorHandler';
import * as actions from '../../store/actions/index';
import { convertEpochToLocal, convertISOToEpoch, getDateTime } from '../../utility/utility';

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

const EventsHistory = (props) => {
    const [eventId, setEventId] = useState('');
    const [editingEvent, setEditingEvent] = useState(false);
    const [eventName, setEventName] = useState('');
    const [eventComment, setEventComment] = useState('');
    const [eventTimestamp, setEventTimestamp] = useState(null);

    const dispatch = useDispatch();
    const onEditEventClick = () => dispatch(actions.editEventInit());

    const { onGetEvents } = props;

    useEffect(() => {
        onGetEvents();
    }, [onGetEvents]);

    useEffect(() => {
        // wait 500ms to set event
        const timeOut = setTimeout(() => null, 500);
        return () => clearTimeout(timeOut);
    }, [eventComment]);

    const editEventHandler = (id) => {
        onEditEventClick();
        axios.get('/events/' + id + '.json')
        .then(response => {
            setEventId(id);
            setEventName(response.data.eventName);
            setEventComment(response.data.eventComment);
            setEventTimestamp(getDateTime(response.data.timestamp));
        })
        .catch(error => {
            console.log(error);
        });
        setEditingEvent(true);
    };

    useEffect(() => {
        console.log('timestamp', eventTimestamp);
    }, [eventTimestamp]);

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
        dateValue={eventTimestamp}
        dateChanged={dateChangeHandler}
        commentChanged={commentChangeHandler}
        editEventCancelled={cancelEditEventHandler}
        editEventSaved={() => props.onEditEvent(eventId, {
            id: eventId,
            eventName: eventName,
            eventComment: eventComment,
            timestamp: convertISOToEpoch(eventTimestamp)
        })}
    />;

    if (props.loading) {
        page = <Spinner />
    };

    if (props.eventAdded) {
        page = <div>Event Updated!</div>
    }

    let events = <Spinner />;

    if (!props.loading) {
        events = props.events.map(event => (
            <Event
                key={event.id}
                actionImage={actionsObj[event.eventName][0]}
                action={actionsObj[event.eventName][1]}
                date={convertEpochToLocal(event.timestamp)}
                deleteEvent={() => props.onDeleteEvent(event.id)}
                editEvent={() => editEventHandler(event.id)}
            />
        ));
    }

    return (
        <div className={classes.EventsHistory}>
            <Modal show={editingEvent} modalClosed={cancelEditEventHandler}>
                {page}
            </Modal>
            {events}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        events: state.event.events,
        loading: state.event.loading,
        eventAdded: state.event.eventAdded
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetEvents: () => dispatch(actions.getEvents()),
        onDeleteEvent: (id) => dispatch(actions.deleteEvent(id)),
        onEditEvent: (id, payload) => dispatch(actions.editEvent(id, payload))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(EventsHistory, axios));
