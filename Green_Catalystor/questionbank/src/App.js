import { useState } from 'react';

import Navbar from './components/navbar';
import Table from './components/table';

import './App.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fillQuestionBank, fillQuestions } from './store/slices/questionSlice';

function App() {

  // storing fetch result in this 
  const [data, setData] = useState([])

  //  redux store-access
  const dispatch = useDispatch();
  const { quesbank, ques } = useSelector(store => store.question)


  //fetching the questions will be called only once
  const fetchQuestion = async () => {

    let res = await fetch(`https://json-operations.onrender.com/questionBank`);
    res = await res.json();


    setData(res)
    dispatch(fillQuestionBank(res.Maths))

  }


  // if select value changes
  const handleQuestionBank = (e) => {
    let subject = e.target.value;

    dispatch(fillQuestionBank(data[subject]));
  }


  // set the Questions according to user Choice
  const arrangeQuestions = (order = 'sequence') => {

    let result = [...quesbank];


    if (order === 'rotate') {
      // since we need previous state to know the rotation sequence
      result = [...ques]
      result.push(result.shift());
    }
    else if (order === 'randomize') {
      result.sort(() => Math.random() - 0.5);
    }

    dispatch(fillQuestions(result));
  }



  // calling fetch for initlaization 
  useEffect(() => {
    fetchQuestion();
  }, [])





  return (
    <div className="App">
      {/* Navbar of the page */}
      <Navbar />

      {/* Question Selectors and options */}

      <div className='container mt-5 px-4 text-center w-100 border-bottom border-danger'>
        {/* row */}
        <div className='row py-2 align-items-center gap-3 flex-sm-row flex-column'>

          {/* two-columns */}
          <div className='col d-flex gap-sm-4 align-items-center flex-column flex-sm-row justify-content-center'>

            <span style={{ fontFamily: "cursive", color: "red", textDecoration: "underline" }}>Subject :</span>

            <select class="form-select mb-sm-3 mt-sm-3 w-auto mt-n1" onChange={handleQuestionBank}>

              <option value="Maths">Maths</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>

            </select>

          </div>

          {/* button selectors */}
          <div className='col d-flex gap-3 justify-content-center flex-sm-nowrap flex-wrap' >

            <button className="btn btn-sm text-bg-danger" onClick={() => arrangeQuestions('sequence')}>Question Sequence</button>
            <button className="btn btn-sm text-bg-danger" onClick={() => arrangeQuestions('rotate')}>Rotate</button>
            <button className="btn btn-sm text-bg-danger" onClick={() => arrangeQuestions('randomize')}>Randomize</button>

          </div>
        </div>

      </div>


      {/* List of Question in table form */}

      <div className='container d-flex gap-5 w-90 m-auto mt-5'>

        <Table questions={quesbank} title="Question Bank" />
        <Table questions={ques} title="Questions" />

      </div>


    </div>
  );
}

export default App;
