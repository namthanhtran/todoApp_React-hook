import React from 'react';
import PropTypes from 'prop-types';

Pagination.propTypes = {
  pagination: PropTypes.bool.isRequired,
  onPageChange: PropTypes.func,
  loading: PropTypes.bool,
};

function Pagination(props) {
  const {pagination = null, onPageChange, loading} = props;
  const {_page, _limit, _totalRows} = pagination;
  const totalPages = Math.ceil(_totalRows / _limit);

  const handlePageChange = (newPage) => {
    if(onPageChange){
      onPageChange(newPage)
    }
  }


  return (
    <div>
      <button disabled={_page <= 1} onClick={() => handlePageChange(_page - 1)}>
        Prev
      </button>
      <button disabled={_page > totalPages} onClick={() => handlePageChange(_page + 1)}>
        Next
      </button>
    </div>
  );
}

export default Pagination;