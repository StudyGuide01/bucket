import {createSlice} from '@reduxjs/toolkit';

const channelSlice = createSlice({
    name:'channel',
    initialState:{
        channels:[]
    },
    reducers:{
        setChannel:(state,action)=>{
            state.channels = action.payload
        }
    }
});

export const {setChannel} = channelSlice.actions;
export default channelSlice.reducer;