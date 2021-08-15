import { yupResolver } from '@hookform/resolvers/yup';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import InputField from '../../component/FormControls/InputField';



const useStyle = makeStyles( (theme) => ({
  root: {
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
  }
}))


TodoForm.propTypes = {
  onSubmit: PropTypes.func,
  initialValue: PropTypes.object,
};

function TodoForm(props) {
  const classes = useStyle();
  const {onSubmit, initialValue} = props; 
  const schema = yup.object().shape({
    title: yup.string().required('Please enter title'),
  })

  const form = useForm({
    defaultValues: {
      title: '',
      status: 'new',
    },
    resolver: yupResolver(schema),
  })
  
  const handleFormSubmit = (values) => {
    if(onSubmit){
      onSubmit(values)
    }

    form.reset();
  }


  return (
    <form onSubmit={form.handleSubmit(handleFormSubmit)} className={classes.root}>
      <InputField form={form} name="title" />
    </form>
  );
}

export default TodoForm;