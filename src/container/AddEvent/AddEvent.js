import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import axios from '../../axios-events';

import EventControls from '../../components/EventControls/EventControls';
import EventSummary from '../../components/EventSummary/EventSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import errorHandler from '../../hoc/errorHandler/errorHandler'
import * as actions from '../../store/actions/index';
import { convertISOToEpoch, getDateTime } from '../../utility/utility';

const AddEvent = (props) => {

    const [addingEvent, setAddingEvent] = useState(false);
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState(getDateTime());
    const [eventComment, setEventComment] = useState('');

    const dispatch = useDispatch();
    const onAddEvent = () => dispatch(actions.addEventInit());

    const dateChangeHandler = (event) => {
        setEventDate(event.target.value);
    };

    const commentChangeHandler = (event) => {
        setEventComment(event.target.value);
    }

    const addEventHandler = (eventType) => {
        onAddEvent();
        setAddingEvent(true);
        setEventName(eventType);
        setEventDate(getDateTime());
    };

    const addEventCancelHandler = () => {
        setAddingEvent(false);
    };

    const addEventContinueHandler = (event) => {
        console.log(eventDate);
        const eventData = {
            eventName: eventName,
            eventComment: eventComment,
            timestamp: convertISOToEpoch(eventDate),
        }
        props.onEventAdd(eventData);
    }

    let page = (
        <EventSummary
            addEventCancelled={addEventCancelHandler}
            addEventContinued={addEventContinueHandler}
            eventName={eventName}
            dateDefaultValue={eventDate}
            submit={addEventContinueHandler}
            dateChanged={dateChangeHandler}
            commentChanged={commentChangeHandler}
        />
    );

    if (props.loading) {
        page = <Spinner />
    }

    if (props.eventAdded) {
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

const mapStateToProps = state => {
    return {
        loading: state.event.loading,
        eventAdded: state.event.eventAdded
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onEventAdd: (eventData) => dispatch(actions.addEvent(eventData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(AddEvent, axios));
