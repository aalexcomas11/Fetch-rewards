import React, { ReactNode } from 'react'

import './styles.sass'


interface ListItemContainerProps{
  children: ReactNode
}

const ListItemContainer: React.FC<ListItemContainerProps> = ({children}) => {
  return (
    <div className="ListItemContainer">
      <ul className="ListItemContainer__list">
        {children}
      </ul>
    </div>
  )
}

export default ListItemContainer