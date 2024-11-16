import {configureStore} from '@reduxjs/toolkit' 
import docreducer from './store/slice.js'
import doreducer from './store/nameslice.js'

const store = configureStore({
    reducer:{
        doc:docreducer,
        do:doreducer

    }
})

export default store