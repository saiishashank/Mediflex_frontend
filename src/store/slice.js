import {createSlice} from '@reduxjs/toolkit'

const docslice = createSlice({
    name:'doc',
    initialState:[],
    reducers:{
        adduser:(state,action)=>{
            state.push(action.payload);
        }
      
    }
})

export const{adduser}=docslice.actions;
export default docslice.reducer;