import React from 'react';
import './CardViewer.css';

class CardViewer extends React.Component {
    
    getCurrentCard = () => this.props.getCurrentCard();

    switchFace = () => this.props.switchFace();

    prevCard = () => this.props.prevCard();
    nextCard = () => this.props.nextCard();

    render() {
        const currentCardFace = this.getCurrentCard();

        return (
            <div>
                <h2>Card Viewer</h2>
                <table onClick={this.switchFace} className="flashcard">
                    <tbody>
                    <tr>
                        <td>{currentCardFace}</td>
                    </tr>
                    </tbody>
                </table>
                <button onClick={this.prevCard}>Previous Card</button>
                <button onClick={this.nextCard}>Next Card</button>
                <p>Card {this.props.currentIndex + 1}/{this.props.numCards}</p>
            </div>

        );
    }
}

export default CardViewer;