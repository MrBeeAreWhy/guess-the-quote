//renders the quote box after making the appropriate API call

import React, { Component } from 'react';
import ScoreBox from '../components/ScoreBox.jsx';

class ScoreContainer extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className="scoreBox">
                <ScoreBox />
            </div>
        )
    }
}

export default ScoreContainer;