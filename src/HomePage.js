import React from 'react';

import {Link} from 'react-router-dom';

class HomePage extends React.Component {
    render() {
        return(
            <div>
                <h1>Welcome to the Flashcards app.</h1>
                <hr></hr>
                <button>
                    <Link to="/editor">Go to Card Editor</Link>
                </button>
                <button>
                    <Link to="viewer">Go to Card Viewer</Link>
                </button>
            </div>
        );
    }
}

export default HomePage;