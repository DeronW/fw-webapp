import React, {Component} from 'react'
import {render} from 'react-dom'
// import {BrowserRouter as Router, Route, Link} from 'react-router'

import * as $FW from '../../../es7-lib/javascripts'
import Header from '../../../es7-lib/javascripts/components/loan/header.jsx'

$FW.DOMReady(()=>{
    render(<Header title="HOT"/>, document.getElementById('header'));
    $FW.Components.showAlert("showToast");
    $FW.Request('').then();
})


