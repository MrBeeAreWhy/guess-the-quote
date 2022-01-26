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
            if (guessList[i] === 'Place your guess below!'){
                guessDisplay.push(<ul key={`guess${i}`} className='makeGuess'>{guessList[i]}</ul>)
                continue;
            }
            guessDisplay.push(<ul key={`guess${i}`} className='guesses'>{guessList[i]}</ul>)
        }

        let hiddenAnswer = [];
        let answer = this.props.characterName;
        for (let i = 0; i < answer.length; i++){
            if (answer[i] === ' '){
                hiddenAnswer.push(<span className='answerRevealBlank'>{answer[i]}</span>);
                continue;
            }
            hiddenAnswer.push(<span className='answerReveal'>{answer[i]}</span>);
        }

        return(
            <div className='guessBox'>
                <div className='inputAndButton'>
                    <form action='#' onSubmit={()=>this.props.makeGuess(textInput)}>
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

export default GuessBox;