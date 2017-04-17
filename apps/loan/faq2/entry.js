import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {observer} from "mobx-react";

import { QUESTIONS } from './components/questions'

import {Header} from 'fw-react-components/components/loan/header'


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

ReactDOM.render(<Header />, document.getElementById('header'));
ReactDOM.render(<FAQ />, document.getElementById('app'));
