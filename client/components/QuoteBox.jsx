import React, { Component } from 'react';

class QuoteBox extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <h3>Which character said this...?</h3>
                {this.props.quoteData.quote}
            </div>
        )
    }
}

export default QuoteBox;