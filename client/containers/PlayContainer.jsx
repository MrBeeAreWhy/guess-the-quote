//renders an guesses field which displays the user's guesses
//renders an input field for the user's guesses
//renders an info box where more info about the quote will be displayed

import React, { Component } from 'react';
import GuessBox from '../components/GuessBox.jsx'
import QuoteInfoBox from '../components/QuoteInfoBox.jsx';

class PlayContainer extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className="playBox">
                <GuessBox 
                characterName={this.props.characterName} 
                makeGuess={this.props.makeGuess}
                thisRoundsGuesses={this.props.thisRoundsGuesses}
                gameBegun={this.props.gameBegun}
                startGame={this.props.startGame}
                startTime={this.props.startTime}
                revealMask={this.props.revealMask}
                />
                <QuoteInfoBox 
                quoteDetails={this.props.quoteDetails} 
                imageDisplayed={this.props.imageDisplayed}
                imageTrigger={this.props.imageTrigger}
                secondsRemaining={this.props.secondsRemaining}
                />
                
            </div>
        )
    }
}

export default PlayContainer;