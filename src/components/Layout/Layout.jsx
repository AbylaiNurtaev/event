import React from 'react'
import Header from '../Header/Header'
import s from './Layout.module.sass'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'

function Layout() {
  return (
    <div className={s.big}>
      <div className={s.container}>
          <Header></Header>
          <Outlet></Outlet>
      </div>
        <Footer></Footer>
    </div>
  )
}

export default Layout