import React from 'react'

const ThemeContext = React.createContext('light');

export default class App extends React.Component {
    render() {
        return (
            <ThemeContext.Provider value="123">
                <Toolbar />
            </ThemeContext.Provider>
        );
    }
}

function Toolbar(props) {
    return (
        <div>
            <ThemedButton />
        </div>
    );
}

class ThemedButton extends React.Component {
    static contextType = ThemeContext;
    render() {
        return (
            <div>{this.context}</div>
        );
    }
}
//
// class Button extends React.Component {
//     render() {
//         return (
//             <div>
//                 {this.props.theme}
//             </div>
//         )
//     }
// }