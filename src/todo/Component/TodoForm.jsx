import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import InputField from '../../component/FormControls/InputField';

TodoForm.propTypes = {
  onSubmit: PropTypes.func,
  initialValue: PropTypes.object,
};

function TodoForm(props) {
  const {onSubmit, initialValue, loading} = props; 

  const [values, setValues] = useState(initialValue || {});

  useEffect( () => {
    setValues(initialValue || {});
  }, [initialValue]); 

  const schema = yup.object().shape({
    title: yup.string().required('Please enter title'),
  })

  const form = useForm({
    defaultValues: {
      title: '',
      status: 'new'
    },
    resolver: yupResolver(schema),
  })
  const handleFormSubmit = (values) => {
    if(onSubmit){
      onSubmit(values);
    }
    form.reset();
  }

  return (
    <form onSubmit={form.handleSubmit(handleFormSubmit)}>
      <InputField form={form} name="title" disable={loading}/>
    </form>
  );
}

export default TodoForm;