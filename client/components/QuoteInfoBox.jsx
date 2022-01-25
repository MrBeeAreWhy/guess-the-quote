import React, { Component } from 'react';

class QuoteInfoBox extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="quoteInfo">
                Here is some info on the quote, in another box!
            </div>
        )
    }
}

export default QuoteInfoBox;