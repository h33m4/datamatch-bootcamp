import React from 'react';
import CardEditor from './CardEditor';
import CardViewer from './CardViewer';
import HomePage from './HomePage';

import { Switch, Route } from 'react-router-dom';

class App extends React.Component {  
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
        <Route path="/viewer/:deckId">
          <CardViewer />
        </Route>
        <Route exact path="/editor">
        <CardEditor />
        </Route>
        <Route>
          <div>Page not found...</div>
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
