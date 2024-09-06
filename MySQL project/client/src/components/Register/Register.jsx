import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';
import "./Register.css"
import { useState } from 'react';
import axios from 'axios';
function FormGroupExample() {
  const passRegex=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
  const [formData, setFormData] = useState({
    user_id:"",
    name:'',
    // fname: "",
    // lname: "",
    // mobile: "",
    // email: "",
    password: "",
    confpassword: "",
  });
  const [error, setError] = useState("");
  const navigate= useNavigate();
  const routeChange = () =>{ 
    let path = `/`; 
    navigate(path);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.password!==formData.confpassword){
      // alert("Passwords do not match");
      setError("Passwords do not match");
      return;
    }
    if(!passRegex.test(formData.password)){
      // alert("Password must be 8-20 characters long and must contain at least one lowercase letter, one uppercase letter and one numeric digit");
      setError("Password must be 8-20 characters long and must contain at least one lowercase letter, one uppercase letter and one numeric digit");
      return;
    }

    axios.post("http://localhost:3001" + "/auth/register", formData).then((res) => {
      console.log(res);
        alert("Registered Successfully");
        routeChange();
    }).catch((err) => {
      console.log(err);
      alert("Error in registering");
    });
  };
  return (<>
  <Button variant='light' style={{position:"absolute",top:"1rem"}} onClick={routeChange}>Home</Button>
  <div className='containers'>
      
    <Form className='forms' onSubmit={handleSubmit} >
      {/* <Form.Group className="mb-3" controlId="formGroupFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control value={formData.fname} name='fname' required placeholder="Enter your First Name"
        onChange={(e)=>{setFormData({...formData,fname:e.target.value})}} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupLastName">
          <Form.Label >Last Name</Form.Label>
          <Form.Control value={formData.lname} name='lname' required placeholder="Enter your Last Name"
          onChange={(e)=>{setFormData({...formData,lname:e.target.value})}} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupMobile">
        <Form.Label >Mobile Number</Form.Label>
        <Form.Control value={formData.mobile} name='mobile' required placeholder="Enter your Mobile Number"
        onChange={(e)=>{setFormData({...formData,mobile:e.target.value})}} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label >Email</Form.Label>
        <Form.Control value={formData.email} name='email'  required placeholder="Enter your Email" 
        autoComplete='username'
        onChange={(e)=>{setFormData({...formData,email:e.target.value})}} />
      </Form.Group> */}
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label >Username</Form.Label>
        <Form.Control value={formData.user_id} name='user_id'  required placeholder="Enter your Username" 
        autoComplete='username'
        onChange={(e)=>{setFormData({...formData,user_id:e.target.value})}} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label >Name</Form.Label>
        <Form.Control value={formData.name} name='name'  required placeholder="Enter your Name" 
        autoComplete='username'
        onChange={(e)=>{setFormData({...formData,name:e.target.value})}} />
      </Form.Group>

      {/* <Form.Group className="mb-3" controlId="formGroupEmail">
        
      </Form.Group> */}

      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label >Password</Form.Label>
        <Form.Control value={formData.password} name='password' autoComplete='new-password' required type="password" placeholder="Password"
         onInput={(e)=>{setFormData({...formData,password:e.target.value});}} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control value={formData.confpassword} autoComplete='new-password' name='confpassword'  required type="password" placeholder="Confirm Password" 
        onInput={(e)=>{ setFormData({...formData,confpassword:e.target.value}); }} />
      </Form.Group>
      <p style={{color:"red"}}>{error}</p>
      <Button   variant="success" type="submit">
        Submit
      </Button>

    </Form>
    </div>
    </> );
}

export default FormGroupExample;