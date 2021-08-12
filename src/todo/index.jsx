import { Box, makeStyles, Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { useEffect, useState } from 'react';
import todoApi from '../api/todoApi';
import EditField from '../component/FormControls/EditField';
import Pagination from '../component/Pagination/Pagination';
import TodoForm from './Component/TodoForm';
import TodoList from './Component/TodoList';

const useStyle = makeStyles( theme => ({
  root: {
    width: '100%',
    maxWidth: '960px',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    marginTop: theme.spacing(1),
    padding: theme.spacing(5),
    marginLeft: 'auto',
    marginRight: 'auto'
  },
}))

TodoFeature.propTypes = {
  
};

const INIT_TODO = {
  title: '',
  status: 'new'
};

function TodoFeature(props) {
  const classes = useStyle();
  const [todoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(INIT_TODO);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1,
  })
  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 10
  })

  useEffect( () => {
    (async() => {
      try {
        setLoading(true);

        const {data, pagination} = await todoApi.getAll(filters);
        setTodoList(data);
        setPagination(pagination);
      } catch (error) {
        console.log('Failed to fetch data', error);
      }
    })();
  }, [filters]);

  
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitEdit = async(formValues) =>{
    console.log('Form edit submit', formValues);
    try {
      setLoading(true);

      await todoApi.update(formValues);
      const {data} = todoApi.getAll();

      setTodoList(data);
    } catch (error) {
      console.log('Failed to update data', error);
    }

    setLoading(false);
    setOpen(false);
  }

  const handleEdit = (todo) => { //handle Open Dialog
    setOpen(true);
    setSelected(todo);
    console.log(todo);
  }


  const handleDelete = async(todo) => {
    try {
      setLoading(true);

      if(window.confirm("Are you sure delete!")){
        await todoApi.remove(todo.id);
        const {data, pagination} = await todoApi.getAll(filters);
        setTodoList(data);
        setFilters({
          ...filters,
          _page: (pagination._totalRows / pagination._limit),
        })
      }
    } catch (error) {
      console.log('Failed to delete todo item:', error);
    }

    setLoading(false);
  }

  const handlePageChange = (newPage) => {
    console.log(newPage);
    setFilters({
      ...filters,
      _page: newPage,
    })
  }

  const handleFormSubmit = async(formValues) => {
    console.log(formValues);
    try {
      setLoading(true);
      await todoApi.add(formValues);

      const { data, pagination } = await todoApi.getAll(filters);
      setTodoList(data);
      setFilters({
        ...filters,
        _page: (pagination._totalRows / pagination._limit),
      })
    } catch (error) {
      console.log('Failed to add new todo item', error);
    }

    setLoading(false);
  }

  return (
    <Box className={classes.root}>
      <Paper>
        <TodoForm onSubmit={handleFormSubmit} />
      </Paper>
      <Paper>
        <TodoList todo={todoList} 
                  onEdit={handleEdit} 
                  onDelete={handleDelete}/>
      </Paper>
      <Paper>
        <Pagination pagination={pagination} onPageChange={handlePageChange}/>
      </Paper>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Change Todo</DialogTitle>
        <DialogContent>
          <EditField initialValue={selected} onSubmit={handleSubmitEdit}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
}

export default TodoFeature;