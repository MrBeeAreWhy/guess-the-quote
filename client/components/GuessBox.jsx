import React, { Component } from 'react';

class GuessBox extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="guessBox">
                Here is a box with guesses from the user.
                <input placeholder="and here is where they make guesses"></input>
            </div>
        )
    }
}

export default GuessBox;