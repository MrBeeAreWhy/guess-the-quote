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
            characterDetail: {},
            imageDisplayed: false,
            charImageDisplayed: false,
            episodeCountDisplayed: false,
            airDateDisplayed: false,
            nicknamesDisplayed: false,
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
        this.makeGuess = this.makeGuess.bind(this);
        this.startGame = this.startGame.bind(this);
        this.countDownTimer = this.countDownTimer.bind(this);
  

    }

    countDownTimer(){
        let timeLeft = this.state.secondsRemaining;
        timeLeft--;
        if (timeLeft < 55 && this.state.episodeCountDisplayed === false){
            this.setState({episodeCountDisplayed: true})
        }
        if (timeLeft < 50 && this.state.airDateDisplayed === false){
            this.setState({airDateDisplayed: true})
        }
        if (timeLeft < 40 && this.state.imageDisplayed === false){
            this.setState({imageDisplayed: true})
        }
        if (timeLeft < 30 && this.state.nicknamesDisplayed === false){
            this.setState({nicknamesDisplayed: true})
        }
        if (timeLeft < 20 && this.state.charImageDisplayed === false){
            this.setState({charImageDisplayed: true})
        }
        if (timeLeft <= 0){
            this.setState({quoteData: {quote: `TIME\'S UP! The right answer was ${this.state.characterName}. Restarting in 5 seconds.`}, dataIsLoaded: false})
            setTimeout(this.startGame, 5000)
            clearInterval(this.state.intervalId);
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
                this.setState({quoteData: {quote: 'CORRECT ANSWER! Next round begins in 5 seconds.'}, dataIsLoaded: false})
                clearInterval(this.state.intervalId);
                return setTimeout(this.startGame, 5000);
            }
            let lettersMatched = 0;
            for (let i = 0; i < this.state.characterName.length; i++){
                if (guessText.current.value[i] === this.state.characterName[i]){
                    lettersMatched++;
                }
            }
            currentGuesses.push('You guessed: ' + guessText.current.value, `\n -- ${lettersMatched} of your letters match correctly.`)
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
        let pageRandom = Math.floor(Math.random()*15);
        let animeList = [
            'Naruto',
            'Death%20Note',
            'Bleach',
            'Dragon%20Ball%20Z',
            'Shingeki%20no%20Kyojin',
            'Fullmetal Alchemist',
            'FLCL',
            'One%20Piece',
            'Cowboy%20Bebop',
            'Trigun'
        ]
        let animeRandom = Math.floor(Math.random()*animeList.length);

        //this.setState({quoteData: {quote: `Quote from ${animeList[animeRandom]} looking at page ${pageRandom}`}, dataIsFetching: true})
        this.setState({dataIsFetching: true})
        console.log('page ', pageRandom)
        fetch(`https://animechan.vercel.app/api/quotes/anime?title=${animeList[animeRandom]}&page=${pageRandom}`)
            .then(response => response.json())
            .then(response => {
                let quoteNum = Math.floor(Math.random()*(Object.keys(response).length))
                console.log(quoteNum)
                let chosenQuote = response[quoteNum]
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
                        console.log(response.results[i])
                        this.setState({animeDetail: response.results[i]});
                        break;
                    }
                }
            })
        }

        if (this.state.dataIsLoaded === true && this.state.detailsAreLoaded === false){
            this.setState({detailsAreLoaded: true})
            let searchName;
            searchName = this.state.characterName.replaceAll(' ', '%20')
            console.log(searchName)
            if (searchName === "Levi%20Ackerman"){searchName = "Levi"}
            if (searchName === "Annie%20Leonhardt"){searchName = "Annie"}
            fetch(`https://api.jikan.moe/v3/search/character?q=${searchName}`)
                .then(response => response.json())
                .then(response => {
                    let matchedChar = false;
                    for (let i = 0; i < response.results.length; i++){
                        for (let j = 0; j < response.results[i].anime.length; j++){
                            console.log(response.results[i].name)
                            if (response.results[i].anime[j].mal_id === this.state.animeDetail.mal_id
                                && response.results[i].name.includes(this.state.characterName.substring(0, this.state.characterName.indexOf(' ')))){
                                this.setState({characterDetail: response.results[i]})
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
            quoteData={this.state.quoteData}
             />
            <PlayContainer 
            quoteDetails={this.state.animeDetail} 
            charDetails={this.state.characterDetail}
            imageDisplayed={this.state.imageDisplayed} //should pass one object, refactoring
            charImageDisplayed={this.state.charImageDisplayed}
            episodeCountDisplayed={this.state.episodeCountDisplayed}
            airDateDisplayed={this.state.airDateDisplayed}
            nicknamesDisplayed={this.state.nicknamesDisplayed}
            characterName={this.state.characterName}
            thisRoundsGuesses={this.state.thisRoundsGuesses}
            gameBegun={this.state.gameBegun}
            startTime={this.state.startTime}
            revealMask={this.state.revealMask}
            makeGuess={this.makeGuess}
            startGame={this.startGame}
            secondsRemaining={this.state.secondsRemaining} />

            <ScoreContainer />
        </div>
        )
    }

}

export default GameContainer;