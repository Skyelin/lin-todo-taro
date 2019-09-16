import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button, Input, Checkbox } from '@tarojs/components'
import { PageOwnProps, PageState } from './index.d'
import './index.scss'


export default class Todo extends Component<PageOwnProps,PageState>{
  constructor(props:PageOwnProps){
    super(props)
  }
  render () {
    let { item, onEditItem, onShowEdit, onCheckItem, onDeleteItem} = this.props
    return (
      <View className='cp-todo-item'>
        {
          item.edit ?
          <View className='list-item'>
            <Input
              className='edit-input'
              type='text'
              value={ item.text }
              onConfirm={ onEditItem }
              onBlur={ onEditItem }
              focus></Input>
          </View>
          : 
          <View 
            onLongPress={ onShowEdit }
            className='list-item'>
            <View 
              className={ item.done ?'check-val-done':'check-val' }>
              <Checkbox 
                value='checkItem'
                className='list-checkbox'
                onClick={ onCheckItem }
                checked={ item.done }></Checkbox>
              <Text className='item-value'>{ item.text }</Text>
            </View>
            <View className='item-right'>
              <Button 
                className='item-btn'
                onClick={ onDeleteItem }
                size='mini' 
              >删除</Button>
            </View>
          </View>
        }
      </View>
    )
  }
}