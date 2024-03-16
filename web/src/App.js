import React, { useState,useEffect } from 'react'
import { SignUp, Login, Homepage} from './pages'
import {Routes, Route} from 'react-router-dom'
import Resources from './pages/Resources'
import Community from './pages/Community'
import Chat from './pages/Chat'
import Tracking from './pages/Tracking'
import About from './pages/About'
import Exercise from './pages/Exercise'


const App = () => {

    const [token, setToken] = useState(false)

    if(token){
        sessionStorage.setItem('token',JSON.stringify(token))
    }

    useEffect(() => {
        if(sessionStorage.getItem('token')){
            let data = JSON.parse(sessionStorage.getItem('token'))
            setToken(data)
        }
    }, [])
    

  return (
    <div className='app'>

            <Routes>
            <Route path={'/signup'} element={<SignUp />}/>
                <Route path={'/'} element={<Login setToken={setToken}/>} />
                {token?<Route path={'/homepage'} element={<Homepage token={token}/>}/>:""}
                <Route exact path='/Resources' element={<Resources />} />
                <Route exact path='/Tracking' element={<Tracking />} />
                <Route exact path='/Community' element={<Community />} />
                <Route exact path='/Chat' element={<Chat />} />
                <Route exact path='/About' element={<About />} />
                <Route exact path='/Exercise' element={<Exercise />} />
            </Routes>

    </div>
  )
}

export default App