import React from 'react';
import PropTypes from 'prop-types';
import { Button, makeStyles } from '@material-ui/core';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useStyle = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}))

Pagination.propTypes = {
  pagination: PropTypes.bool.isRequired,
  onPageChange: PropTypes.func,
  loading: PropTypes.bool,
};

function Pagination(props) {
  const classes = useStyle();
  const {pagination = null, onPageChange, loading} = props;
  const {_page, _limit, _totalRows} = pagination;
  const totalPages = Math.ceil(_totalRows / _limit);

  const handlePageChange = (newPage) => {
    if(onPageChange){
      onPageChange(newPage)
    }
  }


  return (
    <div className={classes.root}>
      <Button disabled={_page <= 1} 
              onClick={() => handlePageChange(_page - 1)}>
        <ArrowLeftIcon />
      </Button>
      <Button disabled={_page >= totalPages} 
              onClick={() => handlePageChange(_page + 1)}>
        <ArrowRightIcon />
      </Button>
    </div>
  );
}

export default Pagination;