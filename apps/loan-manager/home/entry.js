import ReactDOM from 'react-dom'
import React from 'react'

import * as $FW from '../../../es7-lib/javascripts'

$FW.DOMReady(() => {
    $FW.Request('http://fe.9888.cn/fake-api/api/fail.json').then(
        d => console.log(d),
        e => console.log('self handler: ', e.message)
    )
})

// import css from './less/index.less'
