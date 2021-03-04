import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import axios from '../../axios-events';
import useFetch from '../../hooks/use-fetch';
import useFetchData from '../../hooks/use-Async-Endpoint';

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




    const [data, loading, error, callAPI] = useFetch('https://paw-print-dae96.firebaseio.com/events.json');
        // method: 'GET',
        // headers: {
        //     'Content-Type': 'application/json'
        // }
        // body: JSON.stringify({
        //     eventName: eventName,
        //     eventComment: eventComment,
        //     timestamp: convertISOToEpoch(eventDate)
        // })


        const [res, apiMethod] = useFetchData({
            url: 'https://paw-print-dae96.firebaseio.com/events.json',
            method: 'POST',
            payload: {
                eventName: eventName,
                eventComment: eventComment,
                timestamp: convertISOToEpoch(eventDate),
                test: 'fak'
            }
        });

        const testHandler = (event) => {
            event.preventDefault();
            console.log(res);
            console.log(eventName);
            apiMethod();
        }

    let page = (
        <EventSummary
            addEventCancelled={addEventCancelHandler}
            // addEventContinued={}
            eventName={eventName}
            dateDefaultValue={eventDate}
            submit={testHandler}
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
