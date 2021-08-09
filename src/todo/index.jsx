import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Paper } from '@material-ui/core';
import TodoList from './Component/TodoList';
import todoApi from '../api/todoApi';
import Pagination from '../component/Pagination/Pagination';
import queryString from 'query-string';
import TodoForm from './Component/TodoForm';

TodoFeature.propTypes = {
  
};

const INIT_TODO = {
  title: '',
  status: 'new'
};

function TodoFeature(props) {
  const [todoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(INIT_TODO);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 5,
    _totalRows: 1,
  })
  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 5
  })

  useEffect( () => {
    (async() => {
      try {
        setLoading(true);

        const {data, pagination} = await todoApi.getAll(filters);
        setTodoList(data);
        setPagination(pagination);
        console.log(data);
        console.log(pagination);
      } catch (error) {
        console.log('Failed to fetch data', error);
      }
    })();
  }, [filters]);

  const handleEdit = (todo) => {
    setSelected(todo);
  }
  const handleUpdate = async(todo) => {
    try {
      setLoading(true);

      todo.status = todo.status === "completed" ? "new" : "completed"
      const response = await todoApi.update(todo);
      console.log(response);
    } catch (error) {
      console.log('Failed to update todo status', error);
    }

    setLoading(false);
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
    <Box>
      <Paper>
        <TodoForm onSubmit={handleFormSubmit} initialValue={selected} />
      </Paper>
      <Paper>
        <TodoList todo={todoList} 
                  onEdit={handleEdit} 
                  onUpdate={handleUpdate} 
                  onDelete={handleDelete}/>
      </Paper>
      <Paper>
        <Pagination pagination={pagination} onPageChange={handlePageChange}/>
      </Paper>
    </Box>
  );
}

export default TodoFeature;