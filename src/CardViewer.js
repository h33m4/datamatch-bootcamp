import React from 'react';
import './CardViewer.css';

class CardViewer extends React.Component {
    

    render() {
        return (
            <div>
                <h2>Card Viewer</h2>
                <table class="flashcard">
                    <td>
                    Hello
                    </td>
                </table>
                <button>Previous Card</button>
                <button>Next Card</button>
            </div>

        );
    }
}

export default CardViewer;