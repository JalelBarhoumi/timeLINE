import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

/* const todo=require('../TodoApp')

/* 
const pd=todo.phid;
 */ 

export const getTodos = createAsyncThunk(
  'todoApp/todos/getTodos',

  
  async (routeParams, { getState }) => {
    routeParams = routeParams || getState().todoApp.todos.routeParams;
    const response = await axios.get(`http://localhost:5000/tasks`, {
      params: routeParams,
    });
    const data = await response.data;

    return { data, routeParams };
  }
);
export const getPhases = createAsyncThunk(
  'todoApp/todos/getPhases',
  async (routeParams, { getState }) => {
    routeParams = routeParams || getState().todoApp.todos.routeParams;
    const response = await axios.get('http://localhost:5000/phases', {
      params: routeParams,
    });
    const data = await response.data;

    return { data, routeParams };
  }
);

export const addTodo = createAsyncThunk(
  'todoApp/todos/addTodo',
  async (todo, { dispatch, getState }) => {
    const response = await axios.post('http://localhost:5000/tasks', todo);
    const data = await response.data;

    dispatch(getTodos());

    return data;
  }
);

export const updateTodo = createAsyncThunk(
  'todoApp/todos/updateTodo',
  async (todo, { dispatch, getState }) => {
    const url = 'http://localhost:5000/tasks';
    const response = await axios.patch(`${url}/${todo.id}`, todo);
    const data = await response.data;

    dispatch(getTodos());

    return data;
  }
);

export const removeTodo = createAsyncThunk(
  'todoApp/todos/removeTodo',
  async (todo, { dispatch, getState }) => {
    const url = 'http://localhost:5000/tasks';
    const response = await axios.delete(`${url}/${todo.id}`, todo);
    const data = await response.data;

    dispatch(getTodos());

    return data;
  }
);

const todosAdapter = createEntityAdapter({});

export const { selectAll: selectTodos, selectById: selectTodosById } = todosAdapter.getSelectors(
  (state) => state.todoApp.todos
);

const todosSlice = createSlice({
  name: 'todoApp/todos',
  initialState: todosAdapter.getInitialState({
    searchText: '',
    orderBy: '',
    orderDescending: false,
    routeParams: {},
    todoDialog: {
      type: 'new',
      props: {
        open: false,
      },
      data: null,
    },
  }),
  reducers: {
    setTodosSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
    toggleOrderDescending: (state, action) => {
      state.orderDescending = !state.orderDescending;
    },
    changeOrder: (state, action) => {
      state.orderBy = action.payload;
    },
    openNewTodoDialog: (state, action) => {
      state.todoDialog = {
        type: 'new',
        props: {
          open: true,
        },
        data: null,
      };
    },
    closeNewTodoDialog: (state, action) => {
      state.todoDialog = {
        type: 'new',
        props: {
          open: false,
        },
        data: null,
      };
    },
    openEditTodoDialog: (state, action) => {
      state.todoDialog = {
        type: 'edit',
        props: {
          open: true,
        },
        data: action.payload,
      };
    },
    closeEditTodoDialog: (state, action) => {
      state.todoDialog = {
        type: 'edit',
        props: {
          open: false,
        },
        data: null,
      };
    },
  },
  extraReducers: {
    [updateTodo.fulfilled]: todosAdapter.upsertOne,
    [addTodo.fulfilled]: todosAdapter.addOne,
    [getTodos.fulfilled]: (state, action) => {
      const { data, routeParams } = action.payload;
      todosAdapter.setAll(state, data);
      state.routeParams = routeParams;
      state.searchText = '';
    },
  },
});

export const {
  setTodosSearchText,
  toggleOrderDescending,
  changeOrder,
  openNewTodoDialog,
  closeNewTodoDialog,
  openEditTodoDialog,
  closeEditTodoDialog,
} = todosSlice.actions;

export default todosSlice.reducer;
