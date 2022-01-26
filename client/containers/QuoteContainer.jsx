//renders the quote box after making the appropriate API call

import React, { Component } from 'react';
import QuoteBox from '../components/QuoteBox.jsx';


class QuoteContainer extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className="quoteBox">
                <QuoteBox key='quoteContent' quoteData={this.props.quoteData.quote}/>
            </div>
        )
    }
}

export default QuoteContainer;