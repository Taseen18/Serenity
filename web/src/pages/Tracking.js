import React, { useState,useEffect } from 'react'
import '../css/Tracking.css'
import Navbar from "../components/Navbar";
import { supabase } from "../lib/helper/supabaseClient";
import Chart from "chart.js/auto"

async function insertDataDiet(v1,v2,activeForm){
  const user = supabase.auth.getUser()
  const userID = (await user).data.user.id
  console.log(userID)
  if (activeForm){
    const {data, error} = await supabase.from('diet').insert([{calories: v1,protein: v2,user_id: userID}])
  }
  else{
    const {data, error} = await supabase.from('exercise').insert([{steps: v1,user_id: userID}])
  }

}
function Tracking() {
  const [activeForm, setForm] = useState(false);
  const [activeForm2, setForm2] = useState(false);
  const [activeDGraph, setDGraph] = useState(false);
  const [activeEGraph, setEGraph] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const value1 = event.target.elements.value1.value;
    const value2 = event.target.elements.value2.value;
    setForm(false);
    setForm2(false);
    insertDataDiet(value1,value2,activeForm)
  };
  function DForm() {
    if (activeForm){
      return(
        <div className="forms">
                      <form id = "Pool" onSubmit={handleSubmit}>
                      <label>Calories</label>
                      <input type="number" name="value1"></input>
                      <label>Protein</label>
                      <input type="number" name="value2"></input>
                      <input type="submit" value="ok"></input>
                    </form>
        </div>
      )
    }
    if (activeForm2){
      return(
        <div className="forms">
                      <form id = "Pool" onSubmit={handleSubmit}>
                      <label>Steps</label>
                      <input type="number" name="value1"></input>
                      <label>Exercise</label>
                      <input type="number" name="value2"></input>
                      <input type="submit" value="ok"></input>
                    </form>
        </div>
      )
    }  
    }
    const ShowForm1 = () => {
      setForm(true);
      setForm2(false)
    };
    const ShowForm2 = () => {
      setForm(false);
      setForm2(true)
    };
    const ShowExercise = () => {
      setEGraph(true);
      setDGraph(false)
    };
    const ShowDiet = () => {
      setEGraph(false);
      setDGraph(true)
    };
  async function GetTrackData(){
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat','Sun'];
    const yval = [0,0,0,0,0,0,0]
    const user = supabase.auth.getUser()
    const userID = (await user).data.user.id
    let table = ""
    if (activeDGraph){
      table = "diet"
    }
    else{
      table = "exercise"
    }
    try{
      const { data, error } = await supabase.from(table).select().eq('user_id', userID)
      const Today = new Date(data[data.length-1].created_at).toDateString().slice(0,3)
      const index = daysOfWeek.indexOf(Today);
      let count = 0
      for (let i=index;i>=0;i--){
        if (data[data.length-count-1]){
          if (activeDGraph){
            yval[i]=data[data.length-count-1].calories
          }
          else{
            yval[i]=data[data.length-count-1].steps          
          }
  
        }
        count += 1
      }
      return yval
  
    }
    catch{
      return yval
    }

  }

 function DietGraph(){
    const [yValues, setYValues] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        const data = await GetTrackData();
        setYValues(data);
      };
      fetchData();
    }, []);
    useEffect(() => {
      const xValues = ["Mon", "Tue", "Wed", "Thur", "Fri","Sat","Sun"];
      const barColors = ["white", "white","white","white","white","white","white"];
      let lab = "Steps"
      if (activeDGraph){
        lab = "Calories"
      }
      if (activeEGraph){
        lab = "Steps"
      }
      // Creating the chart
      Chart.defaults.color = '#ffffff'
      Chart.defaults.borderColor = '#fffff'
      const myChart = new Chart('myChart', {
        type: 'bar',
        data: {
          labels: xValues,
          datasets: [{
            label: lab,
            data: yValues,
            backgroundColor: barColors,
          }]
        },
        options: {}
      });
      return () => {
        myChart.destroy();
      };
    }); 
  
    return (
      <canvas id="myChart" style={{ maxWidth: '700px', maxHeight: '400px' }}></canvas>
    );
  }
  
  return (
    <div >
      <Navbar></Navbar>
      <div className="container">
        <button className="GraphButton"onClick={ShowExercise}>Show Exercise</button>
        <button className="GraphButton"onClick={ShowDiet}>Show Diet</button>
        <button className="FormButton1" onClick={ShowForm1}>Add Diet</button>
        <button className="FormButton2" onClick={ShowForm2}>Add Exercise</button>
      </div>
      <DietGraph></DietGraph>
      <DForm></DForm>
    </div>
  )
}

export default Tracking
