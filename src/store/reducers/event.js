import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utility/utility'

const initialState = {
    events: [],
    loading: false,
    eventAdded: false,
    error: null
};

const addEventInit = (state, action) => {
    return updateObject(state, {
        loading: false,
        eventAdded: false
    });
}

const addEventStart = (state, action) => {
    return updateObject(state, {loading: true});
};

const addEventSuccess = (state, action) => {
    const newEvents = updateObject(action.eventData, {id: action.eventId})
    return updateObject(state, {
        loading: false,
        eventAdded: true,
        events: state.events.concat(newEvents)
    });
};

const addEventFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
};

const getEventsStart = (state, action) => {
    return updateObject(state, {loading: true});
};

const getEventsFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
};

const getEventsSuccess = (state, action) => {
    return updateObject(state, {
        events: action.events,
        loading: false
    });
};

const deleteEventSuccess = (state, action) => {
    const updatedEvents = state.events.filter(evnt => evnt.id !== action.eventId);
    return updateObject(state, {
        events: updatedEvents,
        loading: false
    });
};

const deleteEventFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
};

const editEventInit = (state, action) => {
    return updateObject(state, {
        loading: false,
        eventAdded: false
    })
};

const editEventStart = (state, action) => {
    return updateObject(state, {loading: true});
};

const editEventSuccess = (state, action) => {
    const editedEventId = state.events.findIndex(event => event.id === action.eventId);
    console.log(editedEventId);
    console.log(action.payload)
    const updatedEvents = [
        ...state.events.slice(0, editedEventId),
        action.payload,
        ...state.events.slice(editedEventId + 1)
    ];
    console.log(updatedEvents)

    return updateObject(state, {
        loading: false,
        eventAdded: true,
        events: updatedEvents
    });
};

const editEventFail = (state, action) => {
 return updateObject(state, {
     loading: false,
     error: action.error
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_EVENT_INIT:
            return addEventInit(state, action);
        case actionTypes.ADD_EVENT_START:
            return addEventStart(state, action);
        case actionTypes.ADD_EVENT_SUCCESS:
            return addEventSuccess(state, action);
        case actionTypes.ADD_EVENT_FAIL:
            return addEventFail(state, action);
        case actionTypes.GET_EVENTS_START:
            return getEventsStart(state, action);
        case actionTypes.GET_EVENTS_SUCCESS:
            return getEventsSuccess(state, action);
        case actionTypes.GET_EVENTS_FAIL:
            return getEventsFail(state, action);
        case actionTypes.DELETE_EVENT_SUCCESS:
            return deleteEventSuccess(state, action);
        case actionTypes.DELETE_EVENT_FAIL:
            return deleteEventFail(state, action);
        case actionTypes.EDIT_EVENT_INIT:
            return editEventInit(state, action);
        case actionTypes.EDIT_EVENT_START:
            return editEventStart(state, action);
        case actionTypes.EDIT_EVENT_SUCCESS:
            return editEventSuccess(state, action);
        case actionTypes.EDIT_EVENT_FAIL:
            return editEventFail(state, action);
        default:
            return state;
    }
};

export default reducer;
