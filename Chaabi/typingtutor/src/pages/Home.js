import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { resetStartTime, stopEndTime, updateCombination, updateNext, updateRepetition, updateSource, updateVisualText } from '../redux/typingReducer';
import { genWordlist, shuffleArray, repeat } from './HomehelperFunctions';
import './home.css'




const Home = () => {
  // visual text is for view of the user
  // n is the length  of words
  // combination defines how many words you need in text
  // repition defines the repition of the same combinination
  // next updates the visal text for the user to enter new text once he finished previous typing
  // current index checks for the visual text and typed text character matching

  const letters = ['a', 's', 'd', 'f', 'j', 'k', 'l'];

  const [currentIndex, setCurrentIndex] = useState(0)
  const [WPM, setWPM] = useState(0)
  const [currectChar,setChar] = useState(0);
  const [accuracy, setAccuracy] = useState(0)
  

  // redux useCase connections
  const { n, combination, repetition, visualText, next,startTime,endTime } = useSelector((store) => store)
  const dispatch = useDispatch();


  //update length of words
  const handleSource = (e) => {
    dispatch(updateSource(e.target.value))
  }

  const handleWPM = ()=>{
    let time = Math.floor((endTime-startTime)/60000);
    let wpm = Math.abs(Math.round(visualText.length/time));
    let acc = Math.floor((currectChar-visualText.length)/visualText.length)*100;
    setWPM(wpm);
   
    setAccuracy(Math.abs(acc));
    setChar(0)
  }

  

  //function to capture the keys pressed on keyborad through window event listener
  const handleKeyDown = (e) => {

   if(startTime === null){
     dispatch(resetStartTime(new Date().getTime()))
   }
   
    const { key } = e;
    const currentKey = visualText[currentIndex];
    setChar((prevChar) =>prevChar+1);

    if (key === currentKey) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      if (currentIndex + 1 === visualText.length) {
        dispatch(updateNext(next))
        handleWPM();
      }
    }
  };



  //this useEffect handles only words generation

  useEffect(() => {


    const result = genWordlist(n, letters)
    const text = shuffleArray(result, combination)
    const final_text = repeat(repetition, text)

    setTimeout(()=>{
      dispatch(updateVisualText(final_text));
      
    },100)
   
  }, [n, combination, repetition, next])


  //handles the typing area value and event listener
  useEffect(() => {
    if (currentIndex === visualText.length) {
      document.querySelector('#tex').value = '';

    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, visualText])


  //handles the curentindex reset once visual text changes
  useEffect(() => {
    setCurrentIndex(0)
  }, [visualText])

useEffect(()=>{

    // Timer logic for 5 minutes
    const timer = setTimeout(() => {

      dispatch(stopEndTime(new Date().getTime()));
      
    }, 5*60*1000); 
    // Cleanup function to clear the timer 
    return () => clearTimeout(timer);
},[dispatch])


  return (
    <div>
      {/* coantiner for all */}

      {/* conatiner of source and typing */}
      <div id="container">
        <h1>Typing Tutor</h1>

        {/* div to genrate the text for typing, */}
        <div id="source_container">
          <div >
            <h4>Source</h4>
            <div>
              <input type="radio" name="Source" value={2} onChange={handleSource} selected />
              <p>2 Words</p>
            </div>
            <div>
              <input type="radio" name="Source" value={3} onChange={handleSource} />
              <p>3 Words</p>
            </div>
            <div>
              <input type="radio" name="Source" value={4} onChange={handleSource} />
              <p>4 Words</p>
            </div>
          </div>
          {/* generator allow combination and repetiotion */}

          <div className='generator'>
            <h4>Generator</h4>
            <div>
              <p>Combination</p>
              <input type="number" maxLength={1} value={combination} onChange={(e) => dispatch(updateCombination(e.target.value))} disabled={combination >= 20} />
            </div>
            <div>
              <p>Repetition</p>
              <input type="number" maxLength={1} value={repetition} onChange={(e) => dispatch(updateRepetition(e.target.value))} />
            </div>
          </div>
        </div>


        {/* conatiner for visual and typing text */}
        <div id="text_container">
          <textarea name="visual_text" className="text-editor" disabled value={visualText}></textarea>
          <textarea name="typing_text" className='text-editor' id="tex"></textarea>

        </div>

        <div className='accuracy-wpm'>
          <div >Accuracy {" : "} {accuracy}%</div>
          <div>WPM {" : "} {WPM}</div>
        </div>

      </div>

    </div>
  )
}

export default Home