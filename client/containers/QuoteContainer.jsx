//renders the quote box after making the appropriate API call

import React, { Component } from 'react';
import QuoteBox from '../components/QuoteBox.jsx';

class QuoteContainer extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div>
                <QuoteBox />
            </div>
        )
    }
}

export default QuoteContainer;