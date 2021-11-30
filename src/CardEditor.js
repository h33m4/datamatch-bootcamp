import React from 'react';
import './CardEditor.css';

import { Link, withRouter } from 'react-router-dom';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class CardEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [{front:'front1', back:'back1'}],
            front: '', 
            back: '',
            name: '',
        };
    }

    createDeck = () => {
        const deckId = this.props.firebase.push('/flashcards').key;
        const newDeck = {cards: this.state.cards, name: this.state.name};
        const redirect = () => {
            console.log("Database updated.");
            this.props.history.push(`/viewer/${deckId}`);
        }
        const updates = {};
        updates[`/flashcards/${deckId}`] = newDeck;
        updates[`/homepage/${deckId}`] = { name: this.state.name};
        this.props.firebase.update('/', updates, redirect);
    }

    addCard = () => {
        let empty = this.state.front.trim() === '' || this.state.back.trim() === '' ? true : false;
        if (empty){
            alert("Cannot add empty card!")
            return;
        }
        
        const card = {front: this.state.front, back: this.state.back};
        const cards = this.state.cards.slice().concat(card);
        this.setState({cards, front: '', back: ''});
    }

    deleteCard = index => {
        const cards = this.state.cards.slice();
        cards.splice(index, 1);
        this.setState({cards});
    }

    handleChange = event => {
        //QUESTION: how is event.target.value changed when a key is pressed
        //console.log(event.target.value);
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        const cards = this.state.cards.map((card, index) => {
            return (
                <tr key={index}>
                    <td>{card.front}</td>
                    <td>{card.back}</td>
                    <td>
                        <button 
                            disabled={this.state.cards.length === 0}
                            onClick={() => this.deleteCard(index)}
                        >
                                Delete Card
                        </button>
                    </td>
                </tr>
            );
        });

        return (
            <div>
                <h2>Card Editor</h2>
                <div>
                    Change deck name:
                    <input
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        placeholder="New deck name"
                    />
                </div>
                <br/>
                <table>
                    <thead>
                        <tr>
                            <th>Front</th>
                            <th>Back</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>{cards}</tbody>
                </table>
                <br/>
                <input name="front" onChange={this.handleChange} placeholder="Front of card" value={this.state.front} />
                <input name="back"onChange={this.handleChange} placeholder="Back of card" value={this.state.back}/>
                <button
                    disabled={this.state.front === '' || this.state.back === ''}
                    onClick={this.addCard}>
                    Add Card
                </button>
                <br/><br/>
                <button
                    disabled={this.state.cards.length === 0 || !this.state.name}
                    onClick={this.createDeck}
                >
                    Create new deck
                </button>
                <hr></hr>
                <button><Link to="/">Home</Link></button>
            </div>
        );
    }
}

export default compose(
    firebaseConnect(),
    withRouter,
)(CardEditor);