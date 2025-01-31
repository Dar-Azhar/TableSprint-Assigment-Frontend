import React from 'react'
import logo from '../assets/images/logo.png'

const Dashboard = () => {
  return (
    <div className='flex flex-col items-center justify-center ' style={{ height: "calc(100vh - 96px)" }}>
      <img src={logo} alt="logo" />
      <p className='font-primary font-medium'>Welcome to TableSprint  admin</p>
    </div>
  )
}

export default Dashboard