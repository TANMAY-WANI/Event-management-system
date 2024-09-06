import axios from 'axios'
import { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
function ProfilePage() {
  const user_id = useSelector((state) => state.user);
  let  [profile, setProfile] = useState({});
  useEffect(() => {
    console.log('i fire once');
    async function fetchData() {

    await axios.post('http://localhost:3001/profile', {
      user_id: user_id
    }, { 'Content-Type': 'application/x-www-form-urlencoded' }).then((res) => {
      // console.log(res.data);
      setProfile(res.data[0]);
      console.log(profile);
    }).catch((err) => {
      console.log(err);
    });
  }
  fetchData();
  }, []);
    return (
      <div style={{ color: "white" }}>
        <h1>Profile</h1>
        <h2>Username: {profile.user_id}</h2>
        <h2>Name: {profile.name}</h2>

      </div>

    )
  }

export default ProfilePage