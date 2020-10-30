import React from 'react';

import Button from '../../components/UI/Button/Button';
import DatePicker from '../../components/UI/DatePicker/DatePicker';
import classes from './EventSummary.module.css';

const eventSummary = (props) => {
    let form = (
        <form className={classes.Form} onSubmit={props.submit}>
            <DatePicker dateDefaultValue={props.dateDefaultValue} changed={props.dateChanged} />
            <textarea
                placeholder={'Add an optional comment...'}
                type={'textarea'}
                onChange={props.commentChanged}
            ></textarea>
            <Button btnType="Danger" clicked={props.addEventCancelled}>CANCEL</Button>
            <Button type="submit" btnType="Success" clicked={props.addEventContinued}>FINISH</Button>
        </form>
    );

    return (
        <div className={classes.EventSummary}>
            <h3>Confirm {props.eventName}</h3>
            {form}
        </div>
    )
}

export default eventSummary;
