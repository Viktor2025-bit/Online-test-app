import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import Signup from './Components/Signup/Signup'

const App = () => {
  return (
    <div>

        <Router>
            <Routes>
                <Route path='/Home' element={<Home/>}/>
                <Route path='/Login' element={<Login/>}/>
                <Route path='/Signup' element={<Signup/>}/>
            </Routes>
                
        </Router>

    </div>
  )
}

export default App