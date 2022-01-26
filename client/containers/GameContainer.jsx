//container for the game board entirety
//will render a quote container and a play container

import React, { Component } from 'react';
import PlayContainer from './PlayContainer.jsx';
import QuoteContainer from './QuoteContainer.jsx';
import ScoreContainer from './ScoreContainer.jsx';


class GameContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quoteData: {quote: "Loading quote data..."},
            animeDetail: {},
            imageDisplayed: false
        }
        this.imageTrigger = this.imageTrigger.bind(this);
    }

    imageTrigger(){
        this.setState({imageDisplayed: true})
    }

    componentDidMount() {
        let pageRandom = Math.floor(Math.random()*6);
        let animeList = [
            "Naruto",
            "Death%20Note",
            "Bleach",
            "Dragon%20Ball%20Z",
            "Shingeki%20no%20Kyojin",
            "Fullmetal Alchemist",
            "FLCL",
        ]
        let animeRandom = Math.floor(Math.random()*animeList.length);
        this.setState({quoteData: {quote: `Quote from ${animeList[animeRandom]} looking at page ${pageRandom}`}})
        /*fetch(`https://animechan.vercel.app/api/quotes/anime?title=${animeList[animeRandom]}&page=${pageRandom}`)
            .then(response => response.json())
            .then(response => {
                let chosenQuote = response[Math.floor(Math.random()*(Object.keys(response).length))].quote
                this.setState({quoteData: {quote: chosenQuote}})
            })
            .catch(error => {
                this.setState({quoteData: {quote: "failed to load data."}})
            })*/
        fetch(`https://api.jikan.moe/v3/search/anime?q=${animeList[animeRandom]}&page=1`)
            .then(response => response.json())
            .then(response => {
                for (let i = 0; i < response.results.length; i++){
                    console.log(response.results[i].title)
                    console.log(animeList[animeRandom].replaceAll('%20', ' '))
                    if (response.results[i].title === animeList[animeRandom].replaceAll('%20', ' ')){
                        this.setState({animeDetail: response.results[i]});
                        break;
                    }
                }
            })
    }


    render(){
        //make fetch call here, pass down quote to quotecontainer
        return(
        <div className="gameplayContainers">
            <QuoteContainer quoteData={this.state.quoteData} />
            <PlayContainer 
            quoteDetails={this.state.animeDetail} 
            imageDisplayed={this.state.imageDisplayed}
            imageTrigger={this.imageTrigger} />
            <ScoreContainer />
        </div>
        )
    }

}

export default GameContainer;