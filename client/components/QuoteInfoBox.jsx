import React, { Component } from 'react';

class QuoteInfoBox extends Component {
    constructor(props){
        super(props);
    }

    componentDidUpdate(){
        console.log('updated')
        if (this.props.imageDisplayed === false){
            setTimeout(this.props.imageTrigger, 3000)
        }
    }

    render(){
        if (this.props.imageDisplayed === true){
        return(
            <div className="quoteInfo">
                <div id="quoteDetails">{this.props.quoteDetails.title}</div>
                <div><img src={this.props.quoteDetails.image_url} id="relImg" alt="Your image"></img></div>
            </div>
        )} else {
        return(
            <div className="quoteInfo">
                <div id="quoteDetails">{this.props.quoteDetails.title}</div>
                <div><img src="https://qph.fs.quoracdn.net/main-qimg-654617264f9192ec976abe6e53356240-lq" id="relImg" alt="Your image"></img></div>
            </div>
            )
        }

    }
}

export default QuoteInfoBox;