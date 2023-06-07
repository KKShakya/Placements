import {configureStore} from '@reduxjs/toolkit'
import  questionSlice  from './slices/questionSlice'


export const store = configureStore({

  reducer:{
     question:questionSlice,
  },
  
})