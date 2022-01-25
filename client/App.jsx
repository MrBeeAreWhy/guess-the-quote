import React, { Component } from 'react';
import GameContainer from './containers/GameContainer.jsx'

class App extends Component {
    constructor (props) {
        super(props);
    }


    render(){
        return (
            <div>
                <GameContainer />
            </div>
        );
    }
}

export default App;