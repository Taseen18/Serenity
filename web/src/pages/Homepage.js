import React, {useState, useEffect, useCallback} from "react";
//import { supabase } from '../lib/helper/supabaseClient';
import '../css/Homepage.css'
import Line from "../assets/images/Line.png"
import Navbar from "../components/Navbar";

function Homepage({ token }) {  
  const [tasks, setTasks] = useState([]);

  const fetchTasks = useCallback(async () => {
    if (!token || !token.session.access_token) {
      console.error('Token not available');
      return;
    }
    const response = await fetch('/to_do_list/tasks/', {
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
  }, [fetchTasks]);

  const markTaskAsComplete = async (taskId) => {
    const response = await fetch(`/to_do_list/tasks/update/${taskId}/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token.session.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed: true }),
    })
    if (response.ok) {
      fetchTasks();
    } else {
      console.error('Error: failed to mark task as complete')
    }
  };


  return (
    <div className = "Home">
      <div className="Dash">
      <Navbar />
        <button className="navbar-button" onClick={fetchTasks}>Fetch Tasks</button>
        <h1 className="title">Serenity</h1>
        <div className='welcome-message'>
            <h1>Welcome back, <span>{token.user.user_metadata.first_name}</span></h1>
        </div>



      </div>
        <div className="footer">
          <a href="#Dash2" className="dashFooter">View Dashboard ↓ </a>
      </div>
      <div id="Dash2"className="Dash2">
        <div className="top">
          <h1 className="title">Dashboard</h1>
          <img className="underline" src={Line} />
        </div>
        <div className="dashInfo">
          <div className="info">
            <div id="trackingSection" className="Section">
              <h1 className="sectionTitle">Tracking</h1>
            </div>
            <div id="CommunitySection" className="Section">
              <h1 className="sectionTitle">Community</h1>
            </div>
            <div id="ToDoSection" className="Section">
              <h1 className="sectionTitle">To Do</h1> 
              <div className='to-do-list'>
                <div className='to-do-list-box'>
                    {tasks.map((task, index) => (
                        <div key={index} className='task'>
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                            <button onClick={() => markTaskAsComplete(task.task_id)}>Mark As Done</button>
                        </div>
                    ))}
                </div>
              </div>
            </div>
            <div id="ChatSection" className="Section">
              <h1 className="sectionTitle">Chat</h1>
            </div>
          </div>

          
       {/* <div className="bottom">
          <img className="dashBottom" src={dashBottom} />
        </div>*/}
        </div>

       
      </div>

    
    </div>
  );
}

export default Homepage;