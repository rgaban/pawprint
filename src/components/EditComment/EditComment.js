import React from 'react';

import Button from '../../components/UI/Button/Button';
import DatePicker from '../../components/UI/DatePicker/DatePicker';
import classes from './EditComment.module.css';
const EditComment = (props) => {
    return (
        <div className={classes.EditComment}>
            <h3>{props.eventName}</h3>
            <DatePicker
                dateValue={props.dateValue}
                defaultDateValue={props.defaultDateValue}
                changed={props.dateChanged} />
            <textarea
                placeholder={'Add an optional comment...'}
                type={'textarea'}
                value={props.commentValue}
                onChange={props.commentChanged}
            ></textarea>
            <Button btnType="Danger" clicked={props.editEventCancelled}>CANCEL</Button>
            <Button type="submit" btnType="Success" clicked={props.editEventSaved}>SAVE</Button>
        </div>
    );
};

export default EditComment;
