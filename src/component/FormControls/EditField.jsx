import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

EditField.propTypes = {
  onSubmit: PropTypes.func,
  initialValue: PropTypes.object,
};

function EditField(props) {
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
  const handleSubmit = (e) => {
    e.preventDefault();

    if(onSubmit){
      onSubmit(values);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" 
             value={values.title} 
             onChange={handleTitleChange}/>
      <input type="text" 
             value={values.status} 
             onChange={handleStatusChange}/>
      <button type="submit">Update</button>
    </form>
  );
}

export default EditField;