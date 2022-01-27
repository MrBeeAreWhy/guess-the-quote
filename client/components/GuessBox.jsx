import React, { Component } from 'react';

class GuessBox extends Component {
    constructor(props){
        super(props)

    }

    render(){
        let textInput = React.createRef();
        let guessDisplay = populateGuesses(this.props.thisRoundsGuesses);
        let hiddenAnswer = revealAnswer(this.props.characterName, this.props.startTime, this.props.revealMask);

        //display startButton if game has not begun that invokes startGame method on gameContainer.
        if (this.props.gameBegun === false){
            return(
            <div className='guessBox'>
                <div className='inputAndButton'>
                    <button id='submitGuessButton' onClick={()=>this.props.startGame()}>Click Here to Start The Game!</button>
                </div>
                <div className='answerBox'>
                    {hiddenAnswer}
                </div>
                <div>{guessDisplay}</div>
            </div>
            )
        } else {
            //display the input box and submit buttons if the game has started.
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

function populateGuesses(guessList){ 

    //parse this.props.thisRoundsGuesses
    //and display appropriate text in the guessBox
    //also, assign unique keys to each guess element
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
        if (guessList[i].length > 75){ //sloppy way to catch the long notice 
            guessDisplay.push(<ul key={`guess${i}`}>{guessList[i]}</ul>)
            continue;
        }
        guessDisplay.push(<ul key={`guess${i}`} className='guesses'>{guessList[i]}</ul>)
    }
    return guessDisplay;
}

function revealAnswer(answer, startTime, revealMask){

    let revealInterval = Math.floor((60000/answer.length))
    let elapsedTime = Date.now() - startTime;
    let revealCount = 0;
    for (let i = elapsedTime; i > 0; i-=revealInterval){
        revealCount++;
    }

    //update the hidden answer as time progresses.
    let hiddenAnswer = [];

    for (let i = 0; i < answer.length; i++){
        hiddenAnswer.push(<span key={`revealHidden${i}`} className='answerReveal'>-</span>);
    }

    for (let i = 0; i < revealCount; i++){
        if (hiddenAnswer[revealMask[i]] !== ' '){
            hiddenAnswer[revealMask[i]] = <span key={`revealUnmasked${revealMask[i]}`} className='answerReveal'>{answer[revealMask[i]]}</span>
        }
    }

    for (let i = 0; i < hiddenAnswer.length; i++){
        if (answer[i] === ' '){
            hiddenAnswer[i] = <span key={`revealBlank${i}`} className='answerRevealBlank'></span>
        }
    }

    return hiddenAnswer;
}









export default GuessBox;