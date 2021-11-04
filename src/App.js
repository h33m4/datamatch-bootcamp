import React from 'react';
import CardEditor from './CardEditor';
import CardViewer from './CardViewer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        {front: 'front1', back: 'back1'},
        {front: 'front2', back: 'back2'},
      ],
      currentIndex: 0,
      currentFace: "front",
    };
  }

  addCard = (card) => {
    const cards = this.state.cards.slice().concat(card);
    this.setState({cards});
  }

  deleteCard = index => {
    const cards = this.state.cards.slice();
    cards.splice(index, 1);
    this.setState({cards});
  }

  getCurrentCard = () => {
    if (this.state.currentFace === "front") {
      return this.state.cards[this.state.currentIndex].front;
    }
    else if (this.state.currentFace === "back") {
      return this.state.cards[this.state.currentIndex].back;
    }
  }

  nextCard = () => {
    if (this.state.currentIndex < this.state.cards.length - 1) {
      this.setState({currentIndex: this.state.currentIndex + 1});
      this.setState({currentFace: "front"});
    }
  }

  prevCard = () => {
    if (this.state.currentIndex > 0) {
      this.setState({currentIndex: this.state.currentIndex - 1});
      this.setState({currentFace: "front"});
    }
  }

  switchFace = () => {
    let newFace = this.state.currentFace === "front" ? "back" : "front";
    this.setState({currentFace: newFace});
  }
  
  render() {
    return (
    <>
    <CardEditor 
    addCard={this.addCard} 
    deleteCard={this.deleteCard} 
    cards={this.state.cards} />
    <CardViewer 
    nextCard={this.nextCard} 
    prevCard={this.prevCard} 
    getCurrentCard={this.getCurrentCard}
    switchFace={this.switchFace}
    currentIndex={this.state.currentIndex}
    numCards={this.state.cards.length}/>
    </>
    );
  }
}

export default App;
