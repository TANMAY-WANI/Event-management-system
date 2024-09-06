import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState} from 'react';
import "./Login.css"
import axios from 'axios';
import { store } from '../../store';
import { setLogin } from '../../state';
import { useSelector } from 'react-redux';
function BasicExample() {
  const navigate= useNavigate();
  const user = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    });
  const routeChange = () =>{ 
    let path = `/`; 
    navigate(path);
  }
  const handleSubmit = async (e) => {
    // alert("Login Successful");
    e.preventDefault();

    const {username,password}=formData;
    axios.post('http://localhost:3001/auth', { 
      user_id: username,
      password: password
      },{'Content-Type': 'application/x-www-form-urlencoded'}).then((res)=>{
        const {accessToken,user_id,name}=res.data;
        store.dispatch(setLogin({user:user_id,token:accessToken}));
        // navigate(-1);
        }).catch((err)=>{
        console.log(err);
        // alert("Invalid Credentials");
        alert(err);
        
      });


  }
    
  return (<>
   <Button variant='light' style={{position:"absolute",top:"1rem"}} onClick={routeChange}>Home</Button>
   {!user?
  <div className='containers'>
    <Form className='forms' onSubmit={handleSubmit}>
    <h1 style={{color:"white"}}>EventBuzz Login</h1>
      <Form.Group  className="mb-3" controlId="formBasicusername">
        <Form.Label>username address</Form.Label>
        <Form.Control value={formData.username} autoComplete='username' name='username' required type="username" placeholder="Enter username"
        onChange={(e)=>{setFormData({...formData,username:e.target.value})}} />
      </Form.Group>

      <Form.Group  className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control value={formData.password} autoComplete='password' minLength={8} name='password' required type="password" placeholder="Password"
        onChange={(e)=>{setFormData({...formData,password:e.target.value})}} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check  required type="checkbox" label="I agree to all T&C" />
      </Form.Group>
      <Link to="../register">Don't have a account? Register instead</Link>
      <br />
      <br />
      <Button variant="success" type="submit" >
        Login
      </Button>
    </Form>
    </div>:<div className='containers'>
    <div className=' logout'>
    <h1 style={{margin:"0 auto"}}>You are Successfully logged in</h1>
    </div>
    </div>}
    </>
  );
}

export default BasicExample;