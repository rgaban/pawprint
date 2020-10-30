import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: '10px auto',
    padding: 0,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    boxSizing: 'border-box',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 220,
    padding: 0,
    maxHeigth: '20px'
  },
}));

const DateAndTimePickers = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <TextField
        id="datetime-local"
        type="datetime-local"
        defaultValue={props.dateDefaultValue}
        value={props.dateValue}
        className={classes.textField}
        onChange={props.changed}
      />
    </div>
  );
};

export default DateAndTimePickers;
