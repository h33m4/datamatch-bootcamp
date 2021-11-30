import React from 'react';

import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { compose } from 'redux';

class HomePage extends React.Component {
    render() {
        if (!isLoaded(this.props.data)){
            return <div>Loading...</div>
        }
        
        console.log("data",this.props.data);
        const decks = Object.keys(this.props.data).map(key => {
            return (
                <div>
                    <Link to={`/viewer/${key}`}>{this.props.data[key].name}</Link>
                    <br/>
                </div>
            );
        });

        return(
            <div>
                <h1>Welcome to the Flashcards app.</h1>
                <hr></hr>
                <div>
                    <Link to="/editor">Create a new card deck</Link>
                </div>
                <h2>Decks</h2>
                <div>
                    {decks}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const data = state.firebase.data.homepage;
    return {data};
}

export default compose(
    firebaseConnect(['/homepage']),
    connect(mapStateToProps),
)(HomePage);