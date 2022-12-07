import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Router from './routes'
import './App.scss'

const App: React.FC = () => {
  return (
    <div className="App">
      <>
        <Router />
        <ToastContainer autoClose={4000} hideProgressBar theme="colored" />
      </>
    </div>
  )
}

export default App
