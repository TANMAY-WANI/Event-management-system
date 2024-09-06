import React from 'react'
import { useNavigate } from 'react-router-dom'
import { setLogout } from '../../state'
import { store } from '../../store';
import './logout.css'
export default function Logout() {
    const navigate= useNavigate();
    const handleLogout = () => {
        navigate(-1);
        store.dispatch(setLogout());
    }
    const handleCancel = () => {
        navigate(-1);
    }
    return (
        <>
            <div className='containers'>
                <div className='logout'>
                <center>
                    <h1>Logout</h1>
                    
                    <h3>Do you really want to Logout?</h3>
                    <div>
                        <button style={{margin:'2rem'}} onClick={handleLogout} className='btn btn-danger'>Logout</button>
                        <button style={{margin:'2rem'}} onClick={handleCancel} className='btn btn-success'>Cancel</button>
                    </div>
                </center>
                </div>
            </div>
        </>
    )
}
