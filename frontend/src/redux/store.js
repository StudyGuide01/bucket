import { configureStore } from "@reduxjs/toolkit";
import channelReducer from './channelSlice.js';

const store = configureStore({
    reducer:{
        channel:channelReducer
    }
});

export default store;