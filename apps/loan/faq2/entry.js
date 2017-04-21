import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { observer } from "mobx-react";

// import { QUESTIONS } from './components/questi
import FW from 'fw-core'

console.log(FW.Ajax)
console.log(FW.Format.urlQuery())

const STYLE = {
    question: {
        // fontSize: 28,
        // lineHeight: 1.6
    },
    answer: {
        // fontSize: 22,
        // lineHeight: 1.6
    },
    arrow: {
        // transform: 'scale(2)'
    }
}

class ToggleList {
    @observable open_list = []
}

class FAQ extends React.Component {
    render() {
        return <div>sssss</div>
    }
}


FW.DOMReady(() => {
// ReactDOM.render(<Header />, document.getElementById('header'));
    ReactDOM.render(<FAQ />, document.getElementById('app'));
})
