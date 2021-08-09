import { Button, makeStyles, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import UpdateIcon from '@material-ui/icons/Update';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Loading from '../../component/Loading/Loading';

const useStyle = makeStyles( (theme) => ({
  li: {
    display: 'flex',
    listStyleType: 'none'
  },
  title: {
    width: '150px',
    padding: '10px',
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'left'
  },
  status: {
    width: '100px',
    padding: '10px',
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'left'
  }
}))

TodoList.propTypes = {
  todo: PropTypes.array,
  onEdit: PropTypes.func,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  loading: PropTypes.bool,
};

function TodoList(props) {
  const classes = useStyle();
  const {todo = [], onEdit, onUpdate, onDelete, loading} = props; 

  return (
    <React.Fragment>
      {loading && <Loading />}
      { !loading && 
        <ul>
          {todo.map((item) => (
            <li key={item.id} 
                className={classNames({'todo-item': true,
                                        completed: item.status === "completed",})}
                style={{display: 'flex'}}
            >
              <Typography className={classes.title}>{item.title}</Typography>
              <Typography className={classes.status}>{item.status}</Typography>
              <Button onClick={ () => onEdit(item)}>
                <EditIcon />
              </Button>
              <Button onClick={ () => onUpdate(item)}>
                <UpdateIcon />
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