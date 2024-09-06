const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "66121200",
  database: "event"
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
const PORT = 3001;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//get user information
app.post('/profile', (req, res) => {
  const { user_id } = req.body;
  con.query(`select * from users WHERE user_id = '${user_id}';`, function (err, results) {
    if(err) {
      console.log(err);
      res.status(404).send(err);
    }
    res.send(results);

  });
});

//user login
app.post('/auth', (req, res) => {
  const { user_id, password } = req.body;
  con.query(`select * from users WHERE user_id = '${user_id}' ;`,async function (err, results) {
    try {
      const isValidPassword= await bcrypt.compare(password,results[0].password);
      if(!isValidPassword) return res.status(400).json({msg:"Invalid Credentials."});
      const accessToken= jwt.sign({id:user_id},process.env.JWT_SECRET,{expiresIn:"30m"});
      res.status(200).json({accessToken, ...results[0]});
      
    } catch (error) {
      console.log(error)
      res.status(500).json({error:error.message});
    }
    
  });
});


//register user
app.post('/auth/register', async(req, res) => {
    const { user_id,name,password } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash=await bcrypt.hash(password,salt);
        
    con.query(`insert into users   values ('${user_id}','${name}','${passwordHash}');`, function (err, results) {
      if(err) {
        console.log(err);
        res.status(500).send(err);
      }
      res.status(201).send(results);
  
    });
});

//admin register
app.post('/admin/register',async (req, res) => {
    const { user_id,name,password } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash=await bcrypt.hash(password,salt);
     
    con.query(`insert into admin_users values ('${user_id}','${name}','${passwordHash}');`, function (err, results) {
      if(err) {
        console.log(err);
        res.status(404).send(err);
      }
      res.send(results);
  
    });
});

//admin login
app.post('/admin/auth', (req, res) => {
  const { user_id, password } = req.body;
  console.log(user_id,password);
  con.query(`select * from admin_users WHERE user_id = '${user_id}' ;`,async function (err, results) {
    try {
      const isValidPassword= await bcrypt.compare(password,results[0].password);
      if(!isValidPassword) return res.status(400).json({msg:"Invalid Credentials."});
      const accessToken= jwt.sign({id:user_id},process.env.JWT_SECRET,{expiresIn:"30m"});
      res.status(200).json({accessToken, ...results[0]});
      
    } catch (error) {
      console.log(error)
      res.status(500).json({error:error.message});
    }
    
  });
});

  //add events
  app.post('/admin/event/add', (req, res) => {
    const { event_id,title,description,start_time,end_time,location,organizer_id,category_id } = req.body;
    con.query(`insert into events (title,description,start_time,end_time,location, organizer_id , category_id) values ('${title}','${description}','${start_time}','${end_time}','${location}','${organizer_id}','${category_id}');`, function (err, results) {
      if(err) {
        console.log(err);
        res.status(404).send(err);
      }
      res.send(results);
  
    });
  });

  //get event information
  app.post('/event', (req, res) => {
    const { event_id } = req.body;
    con.query(`select * from events WHERE event_id = ${event_id}`, function (err, results) {
      if(err) {
        console.log(err);
        res.status(404).send(err);
      }
      res.send(results);
  
    });
  });
  //get event information
  app.post('/allevents', (req, res) => {
    const { event_id } = req.body;
    con.query(`select * from events;`, function (err, results) {
      if(err) {
        console.log(err);
        res.status(404).send(err);
      }
      res.send(results);
  
    });
  });
  

  //add an event attendee
  app.post('/event/register', (req, res) => {
    const { event_id,user_id } = req.body;
    con.query(`select * from event_attendees WHERE user_id  = '${user_id}' AND event_id = '${event_id}'`, function (err, results) {
      if(err) {
        console.log(err);
      }
      if(results.length>0){
        res.status(400).send("Already registered");
      }
      else{
        con.query(`insert into event_attendees values ('${event_id}','${user_id}');`, function (err, results) {
          if(err) {
            console.log(err);
            res.status(404).send(err);
          }
          res.send(results);
      
        });
        }
      })

    
  });

  //get info about an event attendee
  // app.post('/event/ddd', (req, res) => {
  //   const { event_id,user_id } = req.body;
  //   con.query(`select * from event_attendees WHERE user_id  = ${user_id} AND event_id = ${event_id}`, function (err, results) {
  //     if(err) {
  //       console.log(err);
  //       res.status(404).send(err);
  //     }
  //     res.send(results);
  
  //   });
  // });

  //add a comment to the event
  app.post('/events/comment', (req, res) => {
    const { comment_id,event_id,user_id,comment,rating } = req.body;
    con.query(`insert into event_comments  (event_id,user_id,comment,rating) values ('${event_id}','${user_id}','${comment}','${rating}');`, function (err, results) {
      if(err) {
        console.log(err);
        res.status(404).send(err);
      }
      res.send(results);
  
    });
  });

  //display comments
  app.post('/event_comments', (req, res) => {
    const { event_id } = req.body;
    con.query(`select * from event_comments where event_id = ${event_id}`, function (err, results) {
      if(err) {
        console.log(err);
        res.status(404).send(err);
      }
      res.send(results);
  
    });
  });

  //get event category
  app.post('/event/categories', (req, res) => {
    const { event_id } = req.body;
    con.query(`select * from event_categories where category_id in (select category_id from events WHERE event_id = ${event_id})`, function (err, results) {
      if(err) {
        console.log(err);
        res.status(404).send(err);
      }
      res.send(results);
  
    });
  });


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});