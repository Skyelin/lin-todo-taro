import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Button, Input, Checkbox } from '@tarojs/components'
import { PageOwnProps, PageState, TodoItem } from './index.d'
import Todo from '@/components/todoItem/index'
import './index.scss'

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

class Index extends Component<PageOwnProps, PageState> {
  config: Config = {
    navigationBarTitleText: 'lin-todolist-taro'
  }

  constructor(props) {
    super(props)
    this.state = {
      newTodoItem: '',
      todoList: [],
      allChecked: false,
      numLeft: 0,
      numDone: 0,
    }
    this.handlerSetState = this.handlerSetState.bind(this)
    this.onAddNewTodo = this.onAddNewTodo.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.onAllChecked = this.onAllChecked.bind(this)
    this.onDeleteAll = this.onDeleteAll.bind(this)
  }

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */

  componentWillMount () {
    let storage = Taro.getStorageSync('todoList-taro') || '[]'
    this.handlerSetState(storage)
  }
  componentDidMount () {

  }
  componentDidUpdate () {
    Taro.setStorageSync('todoList-taro', this.state.todoList)
  }
  componentDidShow () {
    
  }
  componentDidHide () { 
    
  }

  getUuid () {
    return (
      (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1) +
      new Date()
    )
  }

  saveTodoList (todoList: Array<TodoItem>) {
    return Taro.setStorage({ key: 'todoList', data: todoList })
  }

  handlerSetState(todoList: Array<TodoItem>) {
    let numDone:number = todoList.filter(x => x.done === true).length
    this.setState({
      todoList: todoList,
      allChecked: todoList.findIndex(x => x.done === false) === -1 ? true:false,
      numDone: numDone,
      numLeft: todoList.length - numDone
    })
  }
  onAddNewTodo () {
    let item: TodoItem = {text: this.state.newTodoItem,done:false,edit:false}
    let list: Array<TodoItem> = [...this.state.todoList]
    list.unshift(item)
    if(item.text.trim()) {
      this.handlerSetState(list)
    }
    this.setState({
      newTodoItem: ''
    })
  }
  onInputChange (e: any) {
    let value: string = e.target.value
    this.setState({
      newTodoItem: value
    })
  }
  onAllChecked () {
    let list: Array<TodoItem> = [...this.state.todoList]
    list.forEach(item => item.done = !this.state.allChecked)
    this.handlerSetState(list)
  }
  onCheckItem (index:number) {
    let list:Array<TodoItem> = [...this.state.todoList]
    list[index].done = !list[index].done
    this.handlerSetState(list)
  }
  onDeleteItem (index:number) {
    let list:Array<TodoItem> = [...this.state.todoList]
    list.splice(index,1)
    this.handlerSetState(list)    
  }
  onShowEdit (index:number) {
    let list:Array<TodoItem> = [...this.state.todoList]
    list[index].edit = !list[index].edit
    this.handlerSetState(list)
  }
  onEditItem (index:number,e:any) {
    let text:string = e.target.value
    let list:Array<TodoItem> = [...this.state.todoList]
    list[index].text = text
    list[index].edit = false
    this.handlerSetState(list)    
  }
  onDeleteAll () {
    let list:Array<TodoItem> = this.state.todoList.filter(x => x.done !== true)
    this.handlerSetState(list)
  }
  render () {
    let { todoList, newTodoItem, allChecked, numLeft, numDone } = this.state
    return (
      <View className='pg-todo-list'>
        <View className='todo-view'>
          <Input
            className='todo-input'
            type='text'
            value={ newTodoItem }
            onConfirm={ this.onAddNewTodo }
            onInput={ this.onInputChange }
            placeholder='请输入今日计划'></Input>
        </View>
        {
          todoList.length > 0 && 
          <View className='todo-list'>
            <View className='list-title'>
              <Checkbox 
                value='allcheck'
                className='list-checkbox'
                onClick={ this.onAllChecked }
                checked={ allChecked }>全部已完成</Checkbox>
            </View>
            {
              todoList.map((item,index) => 
                <Todo
                  item={item}
                  index={index}
                  key={ this.getUuid.bind(this) }
                  onEditItem={ this.onEditItem.bind(this,index)}
                  onShowEdit={ this.onShowEdit.bind(this,index)}
                  onCheckItem={ this.onCheckItem.bind(this,index) }
                  onDeleteItem={ this.onDeleteItem.bind(this,index) }/>
              )
            }
            {/* { list } */}
            <View className='todo-footer'>
              <Text className='num-left'>{ numLeft } 个未完成</Text>
              { 
                numDone > 0 &&
                <Button
                  className='clear-all-btn'
                  onClick={ this.onDeleteAll }>删除 { numDone } 个已完成</Button>
              }
            </View>
          </View>
        }
      </View>
    )
  }
}
// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion
export default Index as ComponentClass<PageOwnProps, PageState>
