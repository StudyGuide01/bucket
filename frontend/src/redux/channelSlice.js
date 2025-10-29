import {createSlice} from '@reduxjs/toolkit';

const channelSlice = createSlice({
    name:'channel',
    initialState:{
        channels:[],
        currentChannel:null
    },
    reducers:{
        setChannel:(state,action)=>{
            state.channels = action.payload
        },
        setCurrentChannel:(state,action)=>{
            state.currentChannel = action.payload
        }
    }
});

export const {setChannel,setCurrentChannel} = channelSlice.actions;
export default channelSlice.reducer;