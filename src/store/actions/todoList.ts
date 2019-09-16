import * as Action from '../constants/todolist'

export const addNewTodo = () => {
  return {
    type: Action.ADD_NEW_TODO
  }
}

export const inputChange = (data) => {
  return {
    type: Action.INPUT_CHANGE,
    data: data
  }
}

export const allChecked = () => {
  return {
    type: Action.ALL_CHECKED
  }
}

export const checkItem = (data) => {
  return {
    type: Action.CHECK_ITEM,
    data
  }
}

export const deleteItem = (data) => {
  return {
    type: Action.DELETE_ITEM,
    data
  }
}

export const showEdit = () => {
  return {
    type: Action.SHOW_EDIT
  }
}

export const editItem = (data) => {
  return {
    type: Action.EDIT_ITEM,
    data
  }
}

export const deleteAll = () => {
  return {
    type: Action.DELETE_ALL
  }
}

export const getCache = () => {
  return {
    type: Action.GET_CACHE
  }
}

export const setCache = () => {
  return {
    type: Action.SET_CACHE
  }
}