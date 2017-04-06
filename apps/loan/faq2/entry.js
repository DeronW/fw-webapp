import _ from 'lodash';
import React, { Component } from 'react';
import {render, findDOMNode} from 'react-dom';

// function component () {
//   var element = document.createElement('div');
//
//   /* lodash is required for the next line to work */
//   element.innerHTML = _.join(['Hello','webpack5'], ' ');
//
//   return element;
// }
//
// document.body.appendChild(component());
class App extends React.Component{
    render(){
        return (
            <h1>Hello webpack</h1>
        )
    }
}
render(<App/>, document.getElementById('app'));

