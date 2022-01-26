import React, { Component } from 'react';

class GuessBox extends Component {
    constructor(props){
        super(props)
    }

    render(){
        let textInput = React.createRef();
        let guessList = this.props.thisRoundsGuesses;
        let guessDisplay = [];
        for (let i = 0; i < guessList.length; i++){
            if (guessList[i] === 'Invalid input!'){
                guessDisplay.push(<ul key={`guess${i}`} className='invalidGuess'>{guessList[i]}</ul>)
                continue;
            }
            if (guessList[i] === 'Start the game below!'){
                guessDisplay.push(<ul key={`guess${i}`} className='makeGuess'>{guessList[i]}</ul>)
                continue;
            }
            if (guessList[i].length > 75){
                guessDisplay.push(<ul key={`guess${i}`}>{guessList[i]}</ul>)
                continue;
            }
            guessDisplay.push(<ul key={`guess${i}`} className='guesses'>{guessList[i]}</ul>)
        }

        let hiddenAnswer = [];
        let answer = this.props.characterName;
        for (let i = 0; i < answer.length; i++){
            if (answer[i] === ' '){
                hiddenAnswer.push(<span key={`reveal${i}`} className='answerRevealBlank'>{answer[i]}</span>);
                continue;
            }
            hiddenAnswer.push(<span key={`reveal${i}`} className='answerReveal'>-</span>);
        }

        if (this.props.gameBegun === false){
            return(
            <div className='guessBox'>
                <div className='inputAndButton'>
                    <button id='submitGuessButton' onClick={()=>this.props.startGame()}>Start a game?</button>
                </div>
                <div className='answerBox'>
                    {hiddenAnswer}
                </div>
                <div>{guessDisplay}</div>
            </div>
            )
        } else {
        return(
            <div className='guessBox'>
                <div className='inputAndButton'>
                    <form action='#' onSubmit={()=>this.props.makeGuess(textInput)} autoComplete='off'>
                        <input placeholder='Your guess...?' ref={textInput} id='guessInput'></input>
                        <button id='submitGuessButton' type='submit'>Submit Answer</button>
                    </form>
                </div>
                <div className='answerBox'>
                    {hiddenAnswer}
                </div>
                <div>{guessDisplay}</div>
            </div>
        )
        }
    }

}

export default GuessBox;