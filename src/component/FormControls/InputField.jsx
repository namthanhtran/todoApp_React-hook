import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles,TextField } from '@material-ui/core';
import { Controller, useForm,  } from 'react-hook-form';

const useStyle = makeStyles( (theme) => ({
  textField: {
    width: '400px',
    padding: '20px',
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'left'
  }
}))

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disable: PropTypes.bool,
};

function InputField(props) {
  const {form, name, label, disable} = props;
  const classes = useStyle();
  const {control} = form;

  return (
    <>
      <Controller 
        name={name}
        control={control}
        render={({
          field: {onChange, onBlur, value, name},
          fieldState: {invalid, error}
        }) => (
          <TextField 
            className={classes.textField}
            placeholder="what todo you want to add?"
            variat="outlined"

            name={name}
            value={value}
            label={label}
            disabled={disable}
            error={invalid}
            helperText={error?.message}
            onChange={onChange}
            onBlur={onBlur}
          />
        )}
      /> 
    </>
  );
}

export default InputField;