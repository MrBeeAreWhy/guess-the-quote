import React, { Component } from 'react';

class QuoteInfoBox extends Component {
    constructor(props){
        super(props);
    }

    render(){
        let questionImg = "https://qph.fs.quoracdn.net/main-qimg-654617264f9192ec976abe6e53356240-lq"
        let nickArray = [];
        if (this.props.nicknamesDisplayed){
        if (this.props.charDetails.alternative_names){
            for (let i = 0; i < this.props.charDetails.alternative_names.length; i++){
                nickArray.push(<div key={`altName${i}`}>{this.props.charDetails.alternative_names[i]}</div>)
                if (nickArray.length === 3){break}
            }
        } else {
            nickArray.push('No nicknames!')
        }
        }
        return(
            <div className="quoteInfo">
                <div className="picsAndDetails">
                    <div className="quoteDetails">
                        <ul className='infoHeaders'>
                            Number of Episodes:
                            <li className='listInfo'>{this.props.episodeCountDisplayed ? this.props.quoteDetails.episodes : "..."}</li>
                            Initial Air Date:
                            <li className='listInfo'>{this.props.airDateDisplayed ? new Date(this.props.quoteDetails.start_date).toLocaleDateString() : "..."}</li>
                            Anime Title:
                            <li className='listInfo'>{this.props.imageDisplayed ? this.props.quoteDetails.title : "..."}</li>
                            Character Nicknames:
                            <li className='listInfo'>{this.props.nicknamesDisplayed ? nickArray : "..."}</li>
                        </ul>
                        
                    </div>
                    <div className="animeImage"><img src={this.props.imageDisplayed ? this.props.quoteDetails.image_url : questionImg} id="relImg" alt="Your image"></img></div>
                    <div className="charImage"><img src={this.props.charImageDisplayed ? (this.props.charDetails.image_url ? this.props.charDetails.image_url : questionImg) : questionImg} id="relImg" alt="Your image" onError={event => {event.target.src=questionImg}}></img></div>
                </div>
                <div className="timer"><span id='timeLeft'>{this.props.secondsRemaining}</span> seconds remain</div>
            </div>
        )
        

    }
}

export default QuoteInfoBox;