import ReactDOM from 'react-dom'
import React from 'react'
import {createTemporaryDOMNode} from 'fw-components'


import Header from './header.js'
import BottomNavBar from './bottom-nav-bar.js'
import Bulletin from './bulletin.js'
import BlueAlert from './blue-alert.js'

let showBulletin = text => {
    return new Promise((resolve, reject) => {
        let node = document.createElement('div')
        document.body.appendChild(node)
        ReactDOM.render(<Bulletin text={text} closeHandler={() => {
            ReactDOM.unmountComponentAtNode(node)
            document.body.removeChild(node)
        }}/>, node)
    })
}

let showBlueAlert = function (title, options) {
    options = options || {};
    let id = '_id_react_component_global_alert',
        node = createTemporaryDOMNode(id);

    return new Promise((resolve, _) => {
        render(<Alert
            text={title}
            confirm_text={'确认'}
            mountedNode={node}
            unMountAlert={() => {
                node.parentNode.removeChild(node)
                resolve()
            }}
        />, node)
    })
}

export {Header, BottomNavBar, showBulletin, showBlueAlert}
