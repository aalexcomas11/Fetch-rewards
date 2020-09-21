import React from 'react'

import { Item } from '../../api/types'

import './styles.sass'


const ListItem: React.FC<Item> = ({name,listId}) => {
  return (
    <li className="ListItem">
      <span>List id: {listId}</span>  <span>Name: {name}</span> 
    </li>
  )
}

export default ListItem