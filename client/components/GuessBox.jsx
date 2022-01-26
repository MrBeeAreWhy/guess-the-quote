import React, { Component } from 'react';

class GuessBox extends Component {
    constructor(props){
        super(props)
    }



    render(){
        let guesses;
        return(
            <div className='guessBox'>
                {guesses}
                <div><input placeholder='Your guess'></input></div>
            </div>
        )
    }
}

export default GuessBox;