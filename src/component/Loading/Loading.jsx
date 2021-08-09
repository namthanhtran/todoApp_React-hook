import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, makeStyles } from '@material-ui/core';

Loading.propTypes = {
};

const useStyle = makeStyles( theme => ({
  root: {
    position: 'absolute',
    display: 'block',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto'
  }
}))

function Loading(props) {
  const classes = useStyle();
  return (
    <div>
      <CircularProgress color="secondary" className={classes.root} />
    </div>
  );
}

export default Loading;