import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet, useLocation } from "react-router-dom"
import TemplateImage from './TemplateImage'

const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
    <Header/>
    {!isHomePage && <TemplateImage currentPage={location.pathname.slice(1)} />}
    <Outlet/>
    <Footer/>
    </>
  )
}

export default Layout
