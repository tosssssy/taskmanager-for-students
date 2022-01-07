import React, { ReactNode } from 'react'
import { Header } from './Header'

type Props = {
  children: ReactNode
}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
