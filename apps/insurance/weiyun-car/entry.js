import { render } from 'react-dom'

import { Request } from 'fw-javascripts'

// import $LOAN from '../../../es7-lib/javascripts/new-loan'

import './css/index.css'

import AppRouter from './router'

import * as Stores from './stores'


let stores = {
    car: new Stores.Car('request'),
    holder: new Stores.Holder('request'),
    recognizee: new Stores.Recognizee('request'),
    quotation: new Stores.Quotation('request'),
};

render(AppRouter(stores), document.getElementById('cnt'))
