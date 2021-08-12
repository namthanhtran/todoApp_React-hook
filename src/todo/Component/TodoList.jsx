import { Button, makeStyles, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import React from 'react';
import Loading from '../../component/Loading/Loading';

const useStyle = makeStyles( (theme) => ({
  root: {
    width: '100%',
    maxWidth: "750px",
    margin: 'auto',
    paddingBottom: theme.spacing(3)
  },
  li: {
    width: '100%',
    display: 'flex',
    listStyleType: 'none'
  },
  title: {
    width: '30%',
    padding: theme.spacing(2),
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'left'
  },
  status: {
    width: '30%',
    padding: theme.spacing(2),
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'left'
  }
}))

TodoList.propTypes = {
  todo: PropTypes.array,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  loading: PropTypes.bool,
};

function TodoList(props) {
  const classes = useStyle();
  const {todo = [], onEdit, onDelete, loading} = props; 

  return (
    <React.Fragment>
      {loading && <Loading />}
      { !loading && 
        <ul className={classes.root}>
          {todo.map((item) => (
            <li key={item.id} style={{display: 'flex'}}>
              
            <Typography className={classes.title}>{item.title}</Typography>
            <Typography className={classes.status}>{item.status}</Typography>
            <Button onClick={ () => onEdit(item)}>
              <EditIcon />
            </Button>
            <Button onClick={ () => onDelete(item)}>
              <DeleteIcon />
            </Button>
          </li>
          ))}
        </ul>
      }
    </React.Fragment>
  );
}

export default TodoList;