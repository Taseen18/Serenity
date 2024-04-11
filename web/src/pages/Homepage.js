import React, {useState, useEffect, useCallback} from "react";
import { useAuth } from "../lib/helper/AuthContext";
//import { supabase } from '../lib/helper/supabaseClient';
import '../css/Homepage.css'
import Navbar from "../components/Navbar";
import Post from "../components/post"
function Homepage() {  
  const { token } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // For modal visibility
  const [newTask, setNewTask] = useState({ title: '', description: '' });

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
    fetchAppointments();
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

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.title) {
      alert("Title is required.");
      return;
    }
    const response = await fetch('/to_do_list/tasks/create/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token.session.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: newTask.title, description: newTask.description || '' }),
    });
    if (response.ok) {
      fetchTasks();
      setIsModalOpen(false);
      setNewTask({ title: '', description: '' });
    } else {
      console.error('Error: failed to add new task');
    }
  };

  const fetchAppointments = async () => {
    try {
      if (!token || !token.session.access_token) {
        console.error('Token not available');
        return;
      }
      const response = await fetch(`/appointment/getAppointments/`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token.session.access_token}`,
            'Content-Type': 'application/json',
          },
      });
      const data = await response.json();
      if (data) {
        setAppointments(data.appointments);  
      } else {
        // Handle any errors or empty responses
        console.error('Failed to fetch appointments or no appointments available');
      }
    } catch (error) {
        console.error('Error loading appointments', error)
    }
}


  return (
    <div className = "Home">
      <Navbar />
      <div className='welcome-message'>
          <h1>Welcome back, <span>{token.user.user_metadata.first_name}</span></h1>
          <div className="homepagePostHolder">
          </div>
      </div>

      <div className="homepage-flex-container">
        <div className="Section">
          <h1>To Do</h1> 
          <button className="TaskButtons" onClick={() => setIsModalOpen(true)}>Add Task</button> 
          <div className='section-container'>
            <div className='box'>
                {tasks.map((task, index) => (
                    <div key={index} className='item'>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <button className="TaskButtons" onClick={() => markTaskAsComplete(task.task_id)}>Mark As Done</button>
                    </div>
                ))}
            </div>
          </div>

          {isModalOpen && (
            <div className='modal'>
              <form onSubmit={handleAddTask}>
                <label>Title</label>
                <input type="text" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} required />
                <label>Description</label>
                <textarea value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} required />
                <button type="submit">Submit</button>
                <button onClick={() => setIsModalOpen(false)}>Close</button>
              </form>
            </div>
          )}
        </div>    
        <div className="Section">
          <h1>Upcoming Appointments</h1>
          <div className='section-container'>
            <div className='box'>
                {appointments.map((appointment, index) => (
                    <div key={index} className='item'>
                        <h3>{new Date(appointment.date_time).toLocaleString()}</h3>
                        {/* {appointment.date_time}*/}
                        <p>With: {appointment.with.name}</p>
                    </div>
                ))}
            </div>
          </div>
        </div>
        <div className="Section">
          <h1>Latest posts</h1>
          <div className='section-container'>
            <div className="homepagePostHolder">
              <Post />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;