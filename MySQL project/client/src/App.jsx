import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './components/Login/Login2';
import Logout from './components/Logout/logout';
import ProfilePage from './Pages/ProfilePage';
import HomePage from './Pages/HomePage';
import Register from './components/Register/Register'
import RegisterEvent from './components/RegisterEvent/RegisterEvent';
import Particles from './Particles';
import Comment from './comment/Comment';
import './app.css';
const App= () => {
    return (
        <>
        {/* <Particles /> */}
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path="/login" element={<Login />}  />
                <Route path="/logout" element={<Logout />}  />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/register" element={<Register />} />
                <Route path='/events' element={<RegisterEvent />} />
                <Route path='/events/comment' element={<Comment />} />
            </Routes>
        </BrowserRouter>
        </>
    )
}

export default App;