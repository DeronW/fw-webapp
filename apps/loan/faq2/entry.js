
import React, { Component } from 'react';
import {render, findDOMNode} from 'react-dom';

class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            a: 1
        }
    }
    clickHandler(){
        console.log(this.state)
    }
    render(){
        return (
            <h1 onClick={this.clickHandler.bind(this)}>Hello webpack2</h1>
        )
    }
}
render(<App/>, document.getElementById('app'));

