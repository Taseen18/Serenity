import React from 'react'
import { useNavigate } from 'react-router-dom'

function Homepage({token}) {
    let navigate = useNavigate()

    function handleLogout(){
        sessionStorage.removeItem('token')
        navigate('/')
    }

  return (
    <div>
        <h3>Welcome back, {token.user.user_metadata.first_name}</h3>
        <button onClick={handleLogout}>Log out</button>
    </div>
  )
}

export default Homepage