import "./Card.css";
export const Card = (props)=>{
    return(
        
      <div className='item'>
      <img
          className=" carousel_image  "
          src={props.img}
          alt={props.name}
        />
        <div className='carousel_text'>
          {/* <h3>Artist Name</h3>
          <p>{props.name}</p>
          <h3>Info</h3>
          <p>{props.info}</p>
          <h3>Date</h3>
          <p>{props.date}</p>
          <h3>Time</h3>
          <p>{props.time}</p> */}
        </div>
        
      </div>
        
      
    )
}

export const edmData=[
    {
        name:"Chris Hemsworth",
        info:"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit praesentium dolore modi dolorum. Praesentium eveniet quos numquam doloribus accusamus recusandae!",
        date:"20/12/2022",
        time:"7:00 PM",
        img:"images/event1.jpg"
    },
    {
        name:"Robert Downey Jr.",
        info:"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit praesentium dolore modi dolorum. Praesentium eveniet quos numquam doloribus accusamus recusandae!",
        date:"21/12/2022",
        time:"8:00 PM",
        img:"images/event2.jpg" }

]