import React, { Component } from 'react';

class QuoteInfoBox extends Component {
    constructor(props){
        super(props);
    }

    render(){
        let questionImg = "https://qph.fs.quoracdn.net/main-qimg-654617264f9192ec976abe6e53356240-lq"
        return(
            <div className="quoteInfo">
                <div className="picsAndDetails">
                    <div className="quoteDetails">
                        <ul className='infoHeaders'>
                            Number of Episodes
                            <li className='listInfo'>data</li>
                            Initial Air Date
                            <li className='listInfo'>data</li>
                            Anime Title
                            <li className='listInfo'>{this.props.quoteDetails.title ? this.props.quoteDetails.title : "Awaiting game start."}</li>
                        </ul>
                        
                    </div>
                    <div className="animeImage"><img src={this.props.imageDisplayed ? this.props.quoteDetails.image_url : questionImg} id="relImg" alt="Your image"></img></div>
                    <div className="charImage"><img src={this.props.charImageDisplayed ? this.props.charDetails.image_url : questionImg} id="relImg" alt="Your image" onError={event => {event.target.src=questionImg}}></img></div>
                </div>
                <div className="timer"><span id='timeLeft'>{this.props.secondsRemaining}</span> seconds remain</div>
            </div>
        )
        

    }
}

export default QuoteInfoBox;