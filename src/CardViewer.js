import React from 'react';
import './CardViewer.css';

import { Link } from 'react-router-dom';

class CardViewer extends React.Component {
    constructor (props) {
        super(props);

        let index = this.props.cards.length === 0 ? -1 : 0;

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
        const currentCardFace = this.getCurrentCard();

        return (
            <div>
                <h2>Card Viewer</h2>
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
                <button><Link to="/editor">Go to Editor</Link></button>
            </div>

        );
    }
}

export default CardViewer;