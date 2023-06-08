import React from 'react'
import { useState } from 'react';

const Table = ({ questions, title,checkedQuestions}) => {

  // console.log(questions.map((item)=>item.ques+1))
  
  const [count,setCount] = useState(1);

  const isAllChecked = (e)=>{
  
    if(e.target.checked){
      setCount(count+1);
    }
    else{
      setCount(count-1);
    }
    console.log(count)
    
    let val = questions.length==count;
    checkedQuestions(val);
  }
 
  return (

    <table className="table table-striped table-hover table-info ">
      <thead>
        <tr><td className='text text-bg-info' colSpan={2}>{title}</td></tr>
      </thead>
      <tbody>
        {questions.length > 0 && questions.map((item) => (
          <tr key={item.id}>
            {checkedQuestions?<td><input type="checkbox" onChange={isAllChecked}/></td>:<td>{item.id}.</td>}
            <td className='text text-start'>{item.ques}</td></tr>
        ))}
      </tbody>
    </table>

  )
}

export default Table;