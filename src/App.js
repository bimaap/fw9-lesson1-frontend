import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Contact from './pages/Contact'
import Table from './pages/Table'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Contact />}></Route>
      <Route path='/table' element={<Table />}></Route>
    </Routes>
  )
}

export default App