
import React, { Component } from 'react';
import AnimateOnChange from 'react-animate-on-change';

class QuoteBox extends Component {
    constructor(props){
        super()
        this.toAnimate = false;
    }

    shouldComponentUpdate(nextProps){
        if (this.props.quoteData !== nextProps.quoteData){
            this.toAnimate = true;
        } else {
            return false;
        }
        return true;
    }

    render(){
        return (
            <div>
                <h3>Can you guess which character said this..?</h3>
                <AnimateOnChange 
                    key="animator"
                    baseClassName="quote" 
                    animationClassName="quote-loaded" 
                    animate={this.toAnimate}>
                        {this.props.quoteData}
                </AnimateOnChange>
                
            </div>
        )
    }
}

export default QuoteBox;