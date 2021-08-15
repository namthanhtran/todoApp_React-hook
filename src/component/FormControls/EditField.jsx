import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { useEffect } from 'react';

const useStyle = makeStyles( (theme) => ({
  root: {
    width: '400px',
  },
  clusterInput: {
    display: 'flex',
    flexDirection: 'column'
  },
  input: {
    width: '200px',
    margin: '20px 0',
    padding: '5px 10px',
    borderRadius: '5px 5px 5px 5px',
    border: '1px solid #3248E6',
  },
  button: {
    width: '100%',
    margin: '15px 0 10px 0',
    padding: '5px 10px',
    transition: 'all 0.5s ease',
    borderRadius: '5px 5px 5px 5px',
    border: '1px solid #3248E6',
    '&:hover': {
      transition: 'all 0.5s ease',
      cursor: 'pointer',
      backgroundColor: '#3248E6',
      color: 'white'
    }
  }
}))

EditField.propTypes = {
  onSubmit: PropTypes.func,
  initialValue: PropTypes.object,
};

function EditField(props) {
  const classes = useStyle();
  const {onSubmit, initialValue} = props;
  const [values, setValues] = useState(initialValue);

  useEffect(() => {
    setValues(initialValue);
  }, [initialValue]);

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setValues((prevValue) => ({
      ...prevValue,
      title: newTitle,
    }))
  }
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setValues((prevValue) => ({
      ...prevValue,
      status: newStatus,
    }))
  }
  const handleSubmit = async(e) => {
    e.preventDefault();

    if(onSubmit){
      await onSubmit(values);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.clusterInput}>
        <label>Title</label>
        <input type="text" 
              placeholder="Title"
              value={values.title} 
              onChange={handleTitleChange}
              className={classes.input}/>
        <label>Status</label>
        <input type="text" 
              placeholder="Status"
              value={values.status} 
              onChange={handleStatusChange}
              className={classes.input}/>
        </div>
      <button type="submit" className={classes.button}>Update</button>
    </form>
  );
}

export default EditField;