import React, { Component } from 'react';
import PlayContainer from './PlayContainer.jsx';
import QuoteContainer from './QuoteContainer.jsx';
import ScoreContainer from './ScoreContainer.jsx';


class GameContainer extends Component {
    constructor(props) {
        super(props);
        this.defaultState = {
            quoteData: {quote: 'Awaiting game start...'},
            animeDetail: {},
            imageDisplayed: false,
            dataIsLoaded: false,
            detailsAreLoaded: false,
            animeId: false,
            dataIsFetching: false,
            startTime: Date.now(),
            gameBegun: false,
            intervalId: null,
            secondsRemaining: 60,
            characterName: 'loading...',
            revealMask: {},
            thisRoundsGuesses: ['Start the game below!', 'The text bubbles below will begin to fill in to provide you clues about the character\'s name as time progresses. Additional hints about the anime the character comes from will be displayed in the panel to the right. Your score for a correct answer will decrease with time.'],
        }
        this.state = this.defaultState;
        this.imageTrigger = this.imageTrigger.bind(this);
        this.makeGuess = this.makeGuess.bind(this);
        this.startGame = this.startGame.bind(this);
        this.countDownTimer = this.countDownTimer.bind(this);
  

    }

    imageTrigger(){
        return this.setState({imageDisplayed: true})
    }

    countDownTimer(){
        let timeLeft = this.state.secondsRemaining;
        timeLeft--;
        if (timeLeft < 0){
            clearInterval(gameInterval);
        }
        this.setState({secondsRemaining: timeLeft})
    }

    startGame(){
        const gameInterval = setInterval(this.countDownTimer, 1000)
        this.setState({...this.defaultState, gameBegun: true, startTime: Date.now(), intervalId: gameInterval});
    }

    makeGuess(guessText){
        let currentGuesses = JSON.parse(JSON.stringify(this.state.thisRoundsGuesses));
        if (guessText.current.value.length > 0 && guessText.current.value.length < 40){
            if (guessText.current.value === this.state.characterName && 
                this.state.dataIsLoaded === true){
                document.querySelector('input').value = '';
                clearInterval(this.state.intervalId);
                return this.startGame()
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

    componentDidUpdate() {
        if (this.state.gameBegun === true && this.state.dataIsFetching === false){
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

        //this.setState({quoteData: {quote: `Quote from ${animeList[animeRandom]} looking at page ${pageRandom}`}, dataIsFetching: true})
        this.setState({dataIsFetching: true})
        fetch(`https://animechan.vercel.app/api/quotes/anime?title=${animeList[animeRandom]}&page=${pageRandom}`)
            .then(response => response.json())
            .then(response => {
                let chosenQuote = response[Math.floor(Math.random()*(Object.keys(response).length))]
                let revealMask = {};
                for (let i = 0; i < chosenQuote.character.length; i++){
                    let maskNum = Math.floor(Math.random()*chosenQuote.character.length)
                    if (!revealMask.hasOwnProperty(maskNum)){
                      revealMask[maskNum] = i;
                      i++;
                    }
                    i--
                  }
                this.setState({quoteData: {quote: chosenQuote.quote}, characterName: chosenQuote.character, dataIsLoaded: true, revealMask: revealMask})
            })
            .catch(error => {
                this.setState({quoteData: {quote: "failed to load data."}})
            })
        fetch(`https://api.jikan.moe/v3/search/anime?q=${animeList[animeRandom]}&page=1`)
            .then(response => response.json())
            .then(response => {
                for (let i = 0; i < response.results.length; i++){
                    if (response.results[i].title === animeList[animeRandom].replaceAll('%20', ' ')){
                        this.setState({animeDetail: response.results[i]});
                        break;
                    }
                }
            })
        }

        if (this.state.dataIsLoaded === true && this.state.detailsAreLoaded === false){
            this.setState({detailsAreLoaded: true})
            let searchName = this.state.characterName.replaceAll(' ', '%20')
            fetch(`https://api.jikan.moe/v3/search/character?q=${searchName}`)
                .then(response => response.json())
                .then(response => {
                    console.log('should see anime id for this character', this.state.animeDetail.mal_id)
                    console.log(response.results)
                    let matchedChar = false;
                    for (let i = 0; i < response.results.length; i++){
                        console.log(response.results[i].anime)
                        for (let j = 0; j < response.results[i].anime.length; j++){
                            console.log(response.results[i].anime[j])
                            if (response.results[i].anime[j].mal_id === this.state.animeDetail.mal_id){
                                console.log('MATCHING ANIME AND CHARACTER FOUND')
                                matchedChar = true;
                                break;
                            }
                        }
                        if (matchedChar === true){break}
                    }
                })
                .catch(error => {
                    console.log('there was an error, ', error)
                })    
        }
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
            gameBegun={this.state.gameBegun}
            startTime={this.state.startTime}
            revealMask={this.state.revealMask}
            makeGuess={this.makeGuess}
            imageTrigger={this.imageTrigger}
            startGame={this.startGame}
            secondsRemaining={this.state.secondsRemaining} />

            <ScoreContainer />
        </div>
        )
    }

}

export default GameContainer;