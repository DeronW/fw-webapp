import ReactDOM from 'react-dom'
import React from 'react'

import Header from './header.js'
import BottomNavBar from './bottom-nav-bar.js'
import Bulletin from './bulletin.js'

let showBulletin = text => {
    return new Promise((resolve, reject) => {
        let node = document.createElement('div')
        document.body.appendChild(node)
        ReactDOM.render(<Bulletin text={text} closeHandler={() => {
            ReactDOM.unmountComponentAtNode(node)
            document.body.removeChild(node)
        }} />, node)
    })
}

export { Header, BottomNavBar, showBulletin }
