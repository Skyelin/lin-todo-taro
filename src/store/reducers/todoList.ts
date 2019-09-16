import Taro from '@tarojs/taro'
import * as Action from '../constants/todolist'
// import { TodoItem } from '@/pages/index'

const INITIAL_STATE = {
  newTodoItem: '',
  todoList: [],
  allChecked: false,
  numLeft: 0,
  numDone: 0,
  // inputValue: '', // 文本框输入联动
  // selectNum: 0, // 剩下的条目数
  // delNum: 0, // 清除的条目数
  // todoList: [] // 待办列表 {value:'待办内容',checked:boolean='是否选中状态',edit:boolean='是否编辑状态'}
}

export default function todos(state = INITIAL_STATE, action) {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case Action.ADD_NEW_TODO:
      let item = {text: newState.newTodoItem,done:false,edit:false}
      newState.todoList.unshift(item)
      newState.newTodoItem = ''
      newState.numDone = newState.todoList.filter(x => x.done === true).length
      newState.numLeft = newState.todoList.length - newState.numDone
      return newState
    case Action.INPUT_CHANGE:
      let value = action.data
      newState.newTodoItem = value
      return newState
    case Action.ALL_CHECKED:
      newState.todoList.forEach(item => item.done = !newState.allChecked)
      newState.numDone = newState.todoList.filter(x => x.done === true).length
      newState.numLeft = newState.todoList.length - newState.numDone
      return newState
    case Action.CHECK_ITEM:
      let index = action.data
      newState.todoList[index].done = !newState.todoList[index].done 
      newState.numDone = newState.todoList.filter(x => x.done === true).length
      newState.numLeft = newState.todoList.length - newState.numDone
      return newState
    case Action.DELETE_ITEM:
      index = action.data
      newState.todoList.splice(index,1) 
      newState.numDone = newState.todoList.filter(x => x.done === true).length
      newState.numLeft = newState.todoList.length - newState.numDone
      return newState
    case Action.SHOW_EDIT:
      index = action.data
      newState.todoList[index].edit = !newState.todoList[index].edit
      return newState
    case Action.EDIT_ITEM:
      index = action.data.index
      value = action.data.e
      newState.todoList[index].text = value
      newState.todoList[index].edit = false
      return newState
    case Action.DELETE_ALL:
      newState.todoList = newState.todoList.filter(x => x.done !== true)
      newState.numDone = newState.todoList.filter(x => x.done === true).length
      newState.numLeft = newState.todoList.length - newState.numDone
      return newState
    case Action.GET_CACHE:
      newState = Taro.getStorageSync('todoList-taro') || '[]'
      return newState
    case Action.SET_CACHE:
      Taro.setStorageSync('todoList-taro', newState.todoList)
      return state
    default:
      return state
  }
}