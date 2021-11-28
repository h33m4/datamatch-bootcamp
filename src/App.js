import React from 'react';
import CardEditor from './CardEditor';
import CardViewer from './CardViewer';
import HomePage from './HomePage';
import Test from './Test';

import { Switch, Route } from 'react-router-dom';

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
    this.setState({
        editor: !this.state.editor,
      });
    ALSO, WHY DOES console.log(this.state.editor) before and after the change display the same value?

    you can pass a function as a second param to setState() (which is called when setState is called) to ensure that it happens after
    because otherwise, setState's aren't necessarily executed in the order of the code lines - they are bunched together for efficiency
    or someth
    
  }*/
  
  render() {
    return (
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/viewer">
          <CardViewer cards={this.state.cards}/>
        </Route>
        <Route exact path="/editor">
        <CardEditor 
          addCard={this.addCard} 
          deleteCard={this.deleteCard} 
          cards={this.state.cards} />
        </Route>
        <Route exact path="/test">
          <Test />
        </Route>
      </Switch>
      /* ALTERNATIVE METHOD WITH NEWER VERSION OF 'react-router-dom'
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
        <Route path="/test">
          <Test></Test>
        </Route>
    </Routes>*/
    );
  }
}

export default App;
