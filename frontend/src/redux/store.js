import { configureStore } from "@reduxjs/toolkit";
import channelReducer from './channelSlice.js';
import userReducer from './userSlice.js';

const store = configureStore({
    reducer:{
        channel:channelReducer,
        auth:userReducer
    }
});

export default store;