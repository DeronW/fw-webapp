//import _ from 'lodash';
import React, { Component } from 'react';
import { render, findDOMNode } from 'react-dom';
import Header from 'lib/components/loan'

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
render(<Header title={"faq"} />, document.getElementById('app'));

