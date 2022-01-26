import React, { Component } from 'react';
import PlayContainer from './PlayContainer.jsx';
import QuoteContainer from './QuoteContainer.jsx';
import ScoreContainer from './ScoreContainer.jsx';


class GameContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quoteData: {quote: 'Loading quote data...'},
            animeDetail: {},
            imageDisplayed: false,
            characterName: 'loading...',
            thisRoundsGuesses: ['Place your guess below!'],
        }
        this.imageTrigger = this.imageTrigger.bind(this);
        this.makeGuess = this.makeGuess.bind(this);

    }

    imageTrigger(){
        this.setState({imageDisplayed: true})
    }

    makeGuess(guessText){
        let currentGuesses = JSON.parse(JSON.stringify(this.state.thisRoundsGuesses));
        if (guessText.current.value.length > 0 && guessText.current.value.length < 40){
            if (guessText.current.value === this.state.characterName){
                currentGuesses.push('BRO YOU WON')
                return this.setState({thisRoundsGuesses: currentGuesses})
            }
            currentGuesses.push(guessText.current.value)
            document.querySelector('input').value = '';
            return this.setState({thisRoundsGuesses: currentGuesses})
        } else {
            document.querySelector('input').value = '';
            currentGuesses.push("Invalid input!")
            return this.setState({thisRoundsGuesses: currentGuesses, badGuess: true})
        }
    }

    componentDidMount() {
        let pageRandom = Math.floor(Math.random()*6);
        let animeList = [
            'Naruto',
            'Death%20Note',
            'Bleach',
            'Dragon%20Ball%20Z',
            'Shingeki%20no%20Kyojin',
            'Fullmetal Alchemist',
            'FLCL',
        ]
        let animeRandom = Math.floor(Math.random()*animeList.length);
        this.setState({quoteData: {quote: `Quote from ${animeList[animeRandom]} looking at page ${pageRandom}`}})
        /*fetch(`https://animechan.vercel.app/api/quotes/anime?title=${animeList[animeRandom]}&page=${pageRandom}`)
            .then(response => response.json())
            .then(response => {
                let chosenQuote = response[Math.floor(Math.random()*(Object.keys(response).length))]
                this.setState({quoteData: {quote: chosenQuote.quote}, characterName: chosenQuote.character})
            })
            .catch(error => {
                this.setState({quoteData: {quote: "failed to load data."}})
            })*/
        fetch(`https://api.jikan.moe/v3/search/anime?q=${animeList[animeRandom]}&page=1`)
            .then(response => response.json())
            .then(response => {
                for (let i = 0; i < response.results.length; i++){
                    console.log(response.results[i])
                    console.log(animeList[animeRandom].replaceAll('%20', ' '))
                    if (response.results[i].title === animeList[animeRandom].replaceAll('%20', ' ')){
                        this.setState({animeDetail: response.results[i]});
                        break;
                    }
                }
            })
    }


    render(){
        return(
        <div className="gameplayContainers">
            <QuoteContainer 
            quoteData={this.state.quoteData} />
            <PlayContainer 
            quoteDetails={this.state.animeDetail} 
            imageDisplayed={this.state.imageDisplayed}
            characterName={this.state.characterName}
            thisRoundsGuesses={this.state.thisRoundsGuesses}
            makeGuess={this.makeGuess}
            imageTrigger={this.imageTrigger} />

            <ScoreContainer />
        </div>
        )
    }

}

export default GameContainer;