import React, { Component } from 'react';

class QuoteBox extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="quoteBox">
                This is a quote from a QuoteBox.
            </div>
        )
    }
}

export default QuoteBox;