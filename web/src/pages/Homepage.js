import React, {useState, useEffect, useCallback} from "react";
import { useNavigate } from 'react-router-dom'
//import { supabase } from '../lib/helper/supabaseClient';
import '../css/Homepage.css'

function Homepage({ token }) {
  let navigate = useNavigate();
  
  const [tasks, setTasks] = useState([]);

  const fetchTasks = useCallback(async () => {
    if (!token || !token.session.access_token) {
      console.error('Token not available');
      return;
    }
    const response = await fetch('/api/tasks/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.session.access_token}`,  
      },
    });
    const data = await response.json();
    if (data && data.tasks) {
      setTasks(data.tasks);  
    } else {
      // Handle any errors or empty responses
      console.error('Failed to fetch tasks or no tasks available');
    }
  }, [token]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]); // fetchTasks is now stable and won't cause the effect to rerun unnecessarily

  function handleLogout() {
      sessionStorage.removeItem('token');
      navigate('/');
  }

  return (
    <div>
        <div className="navbar">
            <ul className="navbar-links">
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Community</a></li>
            </ul>
            <div className="navbar-buttons">
                <button className="navbar-button" onClick={handleLogout}>Log out</button>
                <button className="navbar-button" onClick={fetchTasks}>Fetch Tasks</button>
            </div>
        </div>
        <div className='welcome-message'>
            <h1>Welcome back, <span>{token.user.user_metadata.first_name}</span></h1>
        </div>
        <div className='to-do-list'>
            <div className='to-do-list-box'>
                {tasks.map((task, index) => (
                    <div key={index} className='task'>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}

export default Homepage;