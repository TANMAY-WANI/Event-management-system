import axios from 'axios';
import {store} from '../store';
import {setAccessToken, setLogout} from '../state/index';
// let store

// export const injectStore = _store => {
//   store = _store
// }
async function newAccessToken(){
  //get new token via refresh token
  try {
    const newAccessToken = await axios.post('http://localhost:3001/auth/refresh', {
      refreshToken: store.getState().refreshToken
    })
    .then((res)=>{
      console.log(res);
      return res;
    }).catch((err)=>{
      console.log(err);
      console.log('error in newAccessToken logout');
      store.dispatch(setLogout());
    });

      //change token in store
//   if(newAccessToken.data.accessToken){
//     store.dispatch(setAccessToken({token: newAccessToken.data.accessToken}));
//     return newAccessToken.data.accessToken;
// }
// else{
//     store.dispatch(setLogout());
//     console.log('Refresh token expired, please log in again');
//     return null;
// }
    
  } catch (error) {
    console.log("in error"+error,newAccessToken);
  }

}
const authAxios= axios.create({
    
    baseURL: 'http://localhost:3001',
    headers: {
        'Accept': 'application/x-www-form-urlencoded',
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'Authorization': `Bearer `+ store.getState().token
    }

});
// Add a request interceptor
authAxios.interceptors.request.use((request)=> {
    request.headers.Authorization = `Bearer ${store.getState().token}`;
    //if token is expired, refresh token
    // Do something before request is sent
    
    return request;
  }, function (error) {
    // Do something with request error
    console.log(error);
    return Promise.reject(error);
  });

// Add a response interceptor
authAxios.interceptors.response.use(function (response) {
    return response;
  }, async function  (error) {
    console.log(error.response);
    if(error.response.status === 401){
      console.log('inside 401')
      if(error.response.data.error === "jwt expired"){
        console.log('inside jwt expired');
        try {
          const newACT = await newAccessToken();
          console.log("Token expired, new token: "+newACT);
          
        } catch (error) {
          console.log(error);
        }
      }
      else if(error.response.data.error==='refreshToken expired'){
        store.dispatch(setLogout());
        console.log('Refresh token expired, please log in again');


      }
      else{
        console.log(error);
      }
    }

    return Promise.reject(error);
  });

  

  export default authAxios;