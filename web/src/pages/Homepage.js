import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom'
import '../css/Homepage.css'

function Homepage({token}) {
    let navigate = useNavigate()
    
    const [tasks, setTasks] = useState([])

    useEffect(() => {
      fetchTasks();
    });

    const fetchTasks = async () => {
      if (!token || !token.session.access_token) {
        console.error('Token not available')
      }
      const response = await fetch('/api/tasks/', {  
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.session.access_token}`,  
        },
      });
      const data = await response.json();
      if(data && data.tasks) {
        setTasks(data.tasks);  
      } else {
        // Handle any errors or empty responses
        console.error('Failed to fetch tasks or no tasks available');
      }
    };
    

    function handleLogout(){
        sessionStorage.removeItem('token')
        navigate('/')
    }

  return (
    <div>
      <button onClick={handleLogout}>Log out</button>
      <button onClick={fetchTasks}>Fetch Tasks</button>
      <div className='welcome-message'>
        <h1>Welcome back, <span>{token.user.user_metadata.first_name}</span></h1>
      </div>
      <div className='to-do-list'>
        {tasks.map(task => (
          <div key={task.id}>{task.description}</div>
        ))}  
      </div>
    </div>
  )
}

export default Homepage