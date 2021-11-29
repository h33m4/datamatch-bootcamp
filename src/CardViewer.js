import React from 'react';
import './CardViewer.css';

import { Link } from 'react-router-dom';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';


class CardViewer extends React.Component {
    constructor (props) {
        super(props);
        
        let index = 0; // NEED TO FIX CARD 1/3 ISSUE IF CARDS IS EMPTY

        this.state = {
            currentIndex: index,
            currentFace: "front",
        };
    }
    
    getCurrentCard = () => {
        // check if set of cards is empty
        if (this.props.cards.length === 0) {
            return "No cards to display...";
        }

        // get card-face based on currentFace
        if (this.state.currentFace === "front") {
          return this.props.cards[this.state.currentIndex].front;
        }
        else if (this.state.currentFace === "back") {
          return this.props.cards[this.state.currentIndex].back;
        }
    }

    switchFace = () => {
    let newFace = this.state.currentFace === "front" ? "back" : "front";
    this.setState({currentFace: newFace});
    }

    prevCard = () => {
        if (this.state.currentIndex > 0) {
          this.setState({currentIndex: this.state.currentIndex - 1});
          this.setState({currentFace: "front"});
        }
    }

    nextCard = () => {
        if (this.state.currentIndex < this.props.cards.length - 1) {
          this.setState({currentIndex: this.state.currentIndex + 1});
          this.setState({currentFace: "front"});
        }
    }

    render() {
        if (!isLoaded(this.props.cards)) {
            return <div>Loading...</div>
        }

        const currentCardFace = this.getCurrentCard();

        return (
            <div>
                <h2>{this.props.name}</h2>
                <p>Card {this.state.currentIndex + 1}/{this.props.cards.length}</p>
                <table onClick={this.switchFace} className="flashcard">
                    <tbody>
                    <tr>
                        <td>{currentCardFace}</td>
                    </tr>
                    </tbody>
                </table>
                <button
                disabled={this.state.currentIndex <= 0} 
                onClick={this.prevCard}>
                    Previous Card
                </button>
                <button 
                disabled={this.state.currentIndex === this.props.cards.length - 1}
                onClick={this.nextCard}>
                    Next Card
                </button>
                <hr></hr>
                <button><Link to="/">Home</Link></button>
            </div>

        );
    }
}

const mapStateToProps = state => {
    console.log(state);
    const deck = state.firebase.data.deck;
    const name = deck && deck.name;
    const cards = deck && deck.cards;
    return {name: name, cards: cards};
}

export default compose(
    withRouter,
    firebaseConnect(props => {
        console.log('props', props);
        const deckId = props.match.params.deckId;
        return [{path:`/flashcards/${deckId}`, storeAs: 'deck'}]}
    ),
    connect(mapStateToProps),    
)(CardViewer);