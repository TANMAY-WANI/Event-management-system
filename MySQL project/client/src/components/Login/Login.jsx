import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import "./Login.css"
import axios from 'axios';
import { store } from '../../store';
import state, { setLogin } from '../../state';
import { useSelector } from 'react-redux';
import authAxios from '../../axios/authAxios';
function BasicExample() {
  const navigate= useNavigate();
  const user = useSelector((state) => state.user);
  const formData = useRef();
  const routeChange = () =>{ 
    let path = `/`; 
    navigate(path);
  }
  const handleSubmit = async (e) => {
    // alert("Login Successful");
    e.preventDefault();

    const {email,password}=formData.current;
    console.log(email.value,password.value);
    axios.post('http://localhost:3001/auth', { 
      email: email.value,
      password: password.value
      },{'Content-Type': 'application/x-www-form-urlencoded'}).then((res)=>{
        const {accessToken,refreshToken,user}=res.data;
        store.dispatch(setLogin({user:user,token:accessToken,refreshToken:refreshToken}));
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
    <Form className='form' ref={formData} onSubmit={handleSubmit}>
    <h1 style={{color:"white"}}>toPrint Login</h1>
      <Form.Group  className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control autoComplete='email' name='email' required type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group  className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control autoComplete='password' minLength={8} name='password' required type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check required type="checkbox" label="I agree to all T&C" />
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
    <h1 style={{margin:"0 auto"}}>You are Successfully logged</h1>
    </div>
    </div>}
    </>
  );
}

export default BasicExample;