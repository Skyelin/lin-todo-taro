export type PageStateProps = {}

export type PageDispatchProps = {}

export type PageOwnProps = {}

export type PageState = {
  todoList: Array<TodoItem>,
  allChecked: boolean,
  newTodoItem: string,
  numDone: number,
  numLeft: number
}

export type TodoItem = {
  text: string,
  edit: boolean,
  done: boolean
}
// export type IProps = PageStateProps & PageDispatchProps & PageOwnProps