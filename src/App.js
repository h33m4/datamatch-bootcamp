import React from 'react';
import CardEditor from './CardEditor';
import CardViewer from './CardViewer';
import HomePage from './HomePage';

import { Routes, Route } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        {front: 'front1', back: 'back1'},
        {front: 'front2', back: 'back2'},
      ],
      editor: true,
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
/*
  switchMode = () => {
    if (this.state.editor) {
      this.setState({
        editor: false,
      });
    }
    else {
      this.setState({
        editor: true,
      });
    }
    
    WHY DOES THE BELOW CODE NOT WORK?
    this.setState({
        editor: ![this.state.editor],
      });
    ALSO, WHY DOES console.log(this.state.editor) before and after the change display the same value?
    
  }*/
  
  render() {
    return (
      <Routes>
        <Route path="/" element={
          <HomePage />
        }></Route>
        <Route path="/viewer" element={
           <CardViewer cards={this.state.cards}/>
        }></Route>
        <Route path="/editor" element={
          <CardEditor 
          addCard={this.addCard} 
          deleteCard={this.deleteCard} 
          cards={this.state.cards} />
        }></Route>
    </Routes>
    );
  }
}

export default App;
