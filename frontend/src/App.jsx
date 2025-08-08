import React from 'react'
import "./componants/auth.css"
import { Routes, Route } from 'react-router-dom'
import Login from './componants/login'
import Register from './componants/Register'
import StylesList from './componants/StylesList'
import StyleDetail from './componants/StyleDetail'
import Profile from './componants/profile'
import Super from './componants/Super'

const App = () => {
  return (
    <Routes>
        <Route path='/' element={<StylesList />} />
        <Route path='/styles/:id' element={<StyleDetail />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route  element={<Super />}>
            <Route path='/profile' element={<Profile />} />
        </Route>
    </Routes>

  )
}

export default App
