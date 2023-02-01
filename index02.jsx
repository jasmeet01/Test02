import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
const { useState, useEffect, Fragment } = React

const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
const words = [
	{
		word: "apple",
  	hint: "a fruit"
	},
  {
		word: "horse",
  	hint: "a mammal with four legs"
	},
  {
		word: "jupiter",
  	hint: "a planetary body"
	},
  {
		word: "illusion",
  	hint: "something that isn't real"
	},
  {
		word: "javelin",
  	hint: "a throwing weapon"
	}
]
const StartGameScreen = ({ start }) => {
	return (
  	<div className="game">
      <h3> Hangman Game </h3>
  	  <button onClick={start}>Start game</button>
    </div>
  )
}

const GameCompleteScreen = ({ restart }) => {
	return (
  	<div className="game">
      <p>Congratulations! You guessed the correct word,Good job!</p>
      <button onClick={restart}>Restart</button>
    </div>
  )
}

const GameFailedScreen = ({ restart }) => {
  return (
  	<div className="game">
      <p>You ran out of guesses... Please try again.</p>
      <button onClick={restart}>Restart</button>
    </div>
  )
}

const Hangman = ({ showHint, guessCount = 5 }) => {

  const [targetWord, setTargetWord] = useState()
  const [gameStatus, setGameStatus] = useState("GAME_READY_TO_BEGIN")
  
  const [guessedLetters, setGuessedLetters] = useState([])
  const [guessesRemaining, setGuessesRemaining] = useState(guessCount)
  
  const startGame = () => {
  	setTargetWord(words[Math.floor(Math.random() * words.length)])
    setGuessedLetters([])
    setGuessesRemaining(guessCount)
  	setGameStatus("GAME_IN_PROGRESS")
  }
  
  const makeGuess = (letter) => {
  	if (guessedLetters.includes(letter)) {
    	return
    }
  	if (!targetWord.word.includes(letter)) {
    	setGuessesRemaining(guessesRemaining => guessesRemaining - 1)
    }
  	setGuessedLetters(guessedLetters => [...guessedLetters, letter])
  }
  
 	useEffect(() => {
  	if (guessesRemaining === 0) {
      setGameStatus("GAME_COMPLETE__FAIL")
    }

    if (targetWord) {
     if (targetWord.word.split("").find(letter => !guessedLetters.includes(letter)) == null) {
      setGameStatus("GAME_COMPLETE__SUCCESS")
     }
   }
  }, [targetWord, guessedLetters, guessesRemaining])

  if (gameStatus === "GAME_READY_TO_BEGIN") {
  	return <StartGameScreen start={startGame} />
  }
  
  if (gameStatus === "GAME_COMPLETE__FAIL") {
  	return <GameFailedScreen restart={startGame} />
  }
  
  if (gameStatus === "GAME_COMPLETE__SUCCESS") {
  	return <GameCompleteScreen restart={startGame} />
  }
  
	return (
    <div className="container">
      <small>Guesses remaining: {guessesRemaining}</small><br />
      <small>Guessed letters: {guessedLetters}</small>
      
      <div className="word">
        {targetWord.word.split("").map((letter, index) => {
          return (
          	<div key={index} className="letter">
              <span
                className={`${!guessedLetters.includes(letter) ? "hidden" : ""}`}>
                  {letter}
              </span>
            </div>
          )
        })}
      </div>
      
      {showHint && <div className="hint">"{targetWord.hint}"</div>}

      <div className="keyboard">
        {letters.map(letter => {
          return (
            <div 
              className={`key ${guessedLetters.includes(letter) ? "guessed" : ""}`}
              onClick={() => makeGuess(letter)}>
                {letter}
            </div>
          )
        })}
      </div>
    </div>
  )
}

ReactDOM.render(<Hangman showHint guessCount={10} />, document.getElementById("app"))