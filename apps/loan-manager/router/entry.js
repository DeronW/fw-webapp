import React, {Component} from 'react'
import {render} from 'react-dom'
// import {BrowserRouter as Router, Route, Link} from 'react-router'

import * as $FW from '../../../es7-lib/javascripts'


$FW.DOMReady(()=>{
    $FW.Components.showAlert("showToast");
    $FW.Request('').then();
})


