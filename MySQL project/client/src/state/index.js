import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:null,
    token:123,
    refreshToken:null,
    files:[]
}
export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setLogin:(state,action)=>{
            state.user= action.payload.user;
            state.token=action.payload.token;
            state.refreshToken=action.payload.refreshToken;

        },
        setAccessToken:(state,action)=>{
            state.token=action.payload.token;  
        },
        setLogout:(state)=>{
            state.user=null;
            state.token=null;
            state.refreshToken=null;
            state.files=[];
        },
        setPrintShop:(state,action)=>{
            if(state.user){
                state.user.printShop=action.payload.printShop;
            } else {
                console.error("Shop doesnt exist");
            }
        }
    }
})

export const {setLogin,setLogout,setPrintShop,setAccessToken} = authSlice.actions;
export default authSlice.reducer;