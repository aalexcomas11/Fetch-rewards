import React, { ReactNode } from 'react'

import './styles.sass'

export interface PageContainerProps{
  children: ReactNode
}

const PageContainer: React.FC<PageContainerProps> = ({children}) => {
  return (
    <div className="PageContainer">
      {children}
    </div>
  )
}

export default PageContainer