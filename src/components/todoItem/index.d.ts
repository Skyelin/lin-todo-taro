export type PageStateProps = {}

export type PageDispatchProps = {}

export type PageOwnProps = {
  item: TodoItem,
  index: number,
  key: string|number,
  onEditItem: () => any,
  onShowEdit: () => any,
  onCheckItem: () => any,
  onDeleteItem: () => any
}

export type PageState = {}

export type TodoItem = {
  text: string,
  edit: boolean,
  done: boolean
}
// export type IProps = PageStateProps & PageDispatchProps & PageOwnProps