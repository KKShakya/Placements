import React, { useEffect, useState } from 'react'
import './home.css'
import { genWordlist, shuffleArray, repeat } from './Homehelper';

const Home = () => {
// visual text is for view of the user
// n is the length  of words
// combination defines how many words you need in text
// repition defines the repition of the same combinination
// next updates the visal text for the user to enter new text once he finished previous typing
// current index checks for the visual text and typed text character matching

const [n, setN] = useState(2);
  const [visualText, setVisualText] = useState("");
  const [combination, setCombination] = useState(1);
  const [repetition, setRepetition] = useState(2);
  const [next, setNext] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0)


  const letters = ['a', 's', 'd', 'f', 'j', 'k', 'l'];


  //update length of words
  const handleSource = (e) => {
    setN(Number(e.target.value));
  }

  const handleRepetition = (e) => {
    setRepetition(Number(e.target.value))
  }
  const handleCombination = (e) => {
    setCombination(Number(e.target.value))
  }

  //function to capture the keys pressed on keyborad through window event listener
  const handleKeyDown = (e) => {


    const { key } = e;
    const currentKey = visualText[currentIndex];
    console.log(visualText, currentIndex)
    if (key === currentKey) {
      setCurrentIndex((prevIndex) => prevIndex + 1);

      if (currentIndex + 1 === visualText.length) {
        setNext((prev) => !prev);
      }
    }
  };


  //this useEffect handles only words generation

  useEffect(() => {
    const result = genWordlist(n, letters)
    const text = shuffleArray(result, combination)
    const final_text = repeat(repetition, text)

    setVisualText(() => final_text);


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


  return (
    <div>
      {/* coantiner for all */}
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
              <input type="number" maxLength={1} value={combination} onChange={handleCombination} disabled={combination >= 20} />
            </div>
            <div>
              <p>Repetition</p>
              <input type="number" maxLength={1} value={repetition} onChange={handleRepetition} />
            </div>
          </div>
        </div>


        {/* conatiner for visual and typing text */}
        <div id="text_container">
          <textarea name="visual_text" className="text-editor" disabled value={visualText}></textarea>
          <textarea name="typing_text" className='text-editor' id="tex"></textarea>

        </div>

        <div className='accuracy-wpm'>
          <div >Accuracy </div>
          <div>WPM</div>
        </div>

      </div>

    </div>
  )
}

export default Home