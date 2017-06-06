import { render } from 'react-dom'

import { Request } from 'fw-javascripts'

import $LOAN from '../../../es7-lib/javascripts/new-loan'

import './css/index.css'

import AppRouter from './router'

import * as Stores from './stores'


let stores = {};

render(AppRouter(stores), document.getElementById('cnt'))
