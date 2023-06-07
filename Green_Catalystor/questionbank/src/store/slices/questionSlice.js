import {createSlice} from '@reduxjs/toolkit'


 const questionSlice = createSlice({
 
  name:'question',
  
  initialState: {
         quesbank:[],
         ques:[],
  },

  reducers:{
     fillQuestionBank: (state,action)=>{
        state.quesbank = [...action.payload]
        
     },

     fillQuestions: (state,action)=>{
      state.ques = [...action.payload]
     }
  }
});

export const {fillQuestionBank,fillQuestions} = questionSlice.actions
export default questionSlice.reducer