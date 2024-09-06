import React, {useState,useEffect} from "react";
import './Events.css';
import img from '../images/edm.jpg';
import axios from 'axios';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import data from '../tessF.json';

const EventsPage = () => {
  const user = useSelector((state) => state.user);
  
    function time(timestamp){
      // const timestamp = '2023-05-11T18:30:00.000Z';
const date = new Date(timestamp);

// Extract date components
const year = date.getFullYear();
const month = date.getMonth() + 1; // Add 1 to month because it's zero-indexed
const day = date.getDate();

// Extract time components
const hours = date.getUTCHours();
const minutes = date.getUTCMinutes();
const seconds = date.getUTCSeconds();

// Display in desired format (e.g. "11/05/2023 18:30:00")
const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
return (formattedDate);
    }
    const [Events, setEvents] = useState([]);

    async function handleRegister(event_id){
      const user_id= user;
      if(!user){
        navigate('/login');
        return;
      }

      await axios.post('http://localhost:3001/event/register', {
        user_id: user_id,
        event_id: event_id
        },{'Content-Type': 'application/x-www-form-urlencoded'}).then((res)=>{
          console.log(res.data);
          alert("Registered Successfully");
          }).catch((err)=>{
          console.log(err);
          alert("Already Registered");
        });
    }
    //   const image_url = useState(Events.image_url);
    //   const registration_URL = useState(Events.registration_URL);
    
    //   if(image_url && registration_URL  ){
        
        //   }
        
        useEffect(  () =>  {
          async function fetchData() {
    // const data=[{title:'TITLE', description:'DESCRIPTION',image:img,},{title:'TITLE', description:'DESCRIPTION',image:img,},{title:'TITLE', description:'DESCRIPTION',image:img,}]
           await  axios.post('http://localhost:3001/allevents').then((res)=>{
            console.log(res.data);
            setEvents(res.data);
            // return res.data;
            }).catch((err)=>{
            console.log(err);
            });
        }
        fetchData();
        // const data=fetchData();
        // console.log(data);
        // data = JSON.parse(data);
        // setEvents(data);
    }, []);

    const navigate = useNavigate();
    
    return ( 
        <>
        <div className="Event">
        <h1 style={{color:'white',margin:'2rem 45vw'}}>EVENTS</h1>
        <div className="cards">
              <ul className="cards">
          {Events.map((Events,index) => {
              let validInput=true;
                 return(validInput&&<li>
                    <span href="" className="card">
                      <img src={img}  className="card__image" alt="event" />
                        <div className="card__overlay">
                          <div className="card__header">
                            <svg className="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>
                            <div className="card__header-text">
                              <h3 className="card__Name">{Events.title}</h3>  
                              <span className="card__Club">{Events.location}</span>          
                              <span className="card__Club">{time(Events.start_time)+ " to "+ time(Events.end_time)}</span>          
                              {/* <span className="card__Time">{Events.time}</span> */}
                            </div>
                          </div>
                          <div className="Button">
                            <button onClick={ () => {handleRegister(Events.event_id)}} className="Register_button">Register Now</button>
                            <button onClick={ () => {navigate("comment",{state:{event_id:Events.event_id,event_name:Events.title}})}} className="Register_button">Comment</button>
                          </div>
                      </div>
                    </span>      
                  </li>)
                })}
              </ul>
            </div>  
          </div>
        </>
     );
}

export default EventsPage;