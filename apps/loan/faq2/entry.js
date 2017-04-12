
import React, { Component } from 'react';
import { render, findDOMNode } from 'react-dom';

class App extends React.Component {
    constructor() {
        console.log('constructor2', typeof (props))
        super()
        this.state = {
            a: 1
        }
    }
    clickHandler() {

        console.log('clickHandler', this)
        console.log('clickHandler props', this.props)
        console.log('clickHandler state', this.state)

    }
    render() {
        console.log('render', this)
        console.log('render', this.props)
        return (
            <div>
                <h1 onClick={this.clickHandler}>Hello webpack</h1>
                <h1 onClick={this.clickHandler.bind(this)}>Hello webpack2</h1>
            </div>
        )
    }
}
render(<App t={1} />, document.getElementById('app'));

