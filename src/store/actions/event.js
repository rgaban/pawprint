import * as actionTypes from './actionTypes';
import axios from '../../axios-events';

export const addEventSuccess = (id, eventData) => {
    return {
        type: actionTypes.ADD_EVENT_SUCCESS,
        eventId: id,
        eventData: eventData
    };
};

export const addEventFail = (error) => {
    return {
        type: actionTypes.ADD_EVENT_FAIL,
        error: error
    };
};

export const addEventStart = () => {
    return {
        type: actionTypes.ADD_EVENT_START
    };
};

export const addEventInit = () => {
    return {
        type: actionTypes.ADD_EVENT_INIT
    };
};

export const addEvent = (eventData) => {
    return dispatch => {
        dispatch(addEventStart());
        axios.post('/events.json', eventData)
            .then(response => {
                dispatch(addEventSuccess(response.data.name, eventData))
            })
            .catch(error => {
                dispatch(addEventFail(error));
            });
    };
};

export const getEventsSuccess = (events) => {
    return {
        type: actionTypes.GET_EVENTS_SUCCESS,
        events: events
    };
};

export const getEventsFail = (error) => {
    return {
        type: actionTypes.GET_EVENTS_FAIL,
        error: error
    };
};

export const getEventsStart = () => {
    return {
        type: actionTypes.GET_EVENTS_START
    };
};

export const getEvents = () => {
    return dispatch => {
        dispatch(getEventsStart());
        axios.get('/events.json?&orderBy="timestamp"')
            .then(response => {
                const fetchedEvents = [];
                for (let key in response.data) {
                    fetchedEvents.push({
                        ...response.data[key],
                        id: key
                    });
                };
                dispatch(getEventsSuccess(fetchedEvents.reverse())); // need better algo to sort by timestamp ascending!
            })
            .catch(error => {
                dispatch(getEventsFail(error));
            });
    };
};

export const deleteEventSuccess = (id) => {
    return {
        type: actionTypes.DELETE_EVENT_SUCCESS,
        eventId: id
    };
};

export const deleteEventFail = (error) => {
    return {
        type: actionTypes.DELETE_EVENT_FAIL,
        error: error
    };
};

export const deleteEvent = (id) => {
    return dispatch => {
        axios.delete('/events/' + id + '.json')
            .then(response => {
                dispatch(deleteEventSuccess(id));
            })
            .catch(error => {
                dispatch(deleteEventFail(error));
            });
    };
};

export const editEventInit = () => {
    return {
        type: actionTypes.EDIT_EVENT_INIT
    }
};

export const editEventStart = () => {
    return {
        type: actionTypes.EDIT_EVENT_START
    };
};

export const editEventSuccess = (id, payload) => {
    return {
        type: actionTypes.EDIT_EVENT_SUCCESS,
        eventId: id,
        payload: payload
    };
};

export const editEventFail = (error) => {
    return {
        type: actionTypes.EDIT_EVENT_FAIL,
        error: error
    };
};

export const editEvent = (id, payload) => {
    return dispatch => {
        dispatch(editEventStart());
        axios.patch('/events/' + id + '.json', payload)
        .then(response => {
            dispatch(editEventSuccess(id, payload));
            console.log(response);

        })
        .catch(error => {
            dispatch(editEventFail());
        });
    }
}
