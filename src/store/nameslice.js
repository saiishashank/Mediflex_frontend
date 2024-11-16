import {createSlice} from '@reduxjs/toolkit'

const doslice = createSlice({
    name:'user',
    initialState:[],
    reducers:{
        adduser:(state,action)=>{
            state.push(action.payload);
        }
      
    }
})

export const{add}=doslice.actions;
export default doslice.reducer;