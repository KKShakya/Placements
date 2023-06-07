import React from 'react'

const Table = ({ questions, title }) => {

  // console.log(questions.map((item)=>item.ques+1))

  return (

    <table className="table table-bordered table-striped table-hover table-info">
      <thead>
        <tr><td className='text text-bg-info' colSpan={2}>{title}</td></tr>
      </thead>
      <tbody>
        {questions.length > 0 && questions.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.ques}</td></tr>
        ))}
      </tbody>
    </table>

  )
}

export default Table;