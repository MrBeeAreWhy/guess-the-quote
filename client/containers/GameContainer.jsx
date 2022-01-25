//container for the game board entirety
//will render a quote container and a play container

import React, { Component } from 'react';
import PlayContainer from './PlayContainer.jsx';
import QuoteContainer from './QuoteContainer.jsx';

class GameContainer extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
        <div className="gameplayContainers">
            <QuoteContainer />
            <PlayContainer />
        </div>
        )
    }

}

export default GameContainer;